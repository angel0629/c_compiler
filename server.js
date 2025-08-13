const express = require("express");
const db = require('./db'); //db.js 的檔案
const fs = require("fs");
const path = require("path");
const { spawn } = require('child_process');
const crypto = require('crypto');
const LIMITS = {
  WALL_MS: parseInt(process.env.J_WALL_MS || '2000'),   // 牆鐘時間(ms)
  CPUS: process.env.J_CPUS || '0.5',                    // 0.5 類似半顆 CPU
  MEM: process.env.J_MEM || '128m',                     // 記憶體上限
  PIDS: process.env.J_PIDS || '64',                     // process/thread 上限
  NOFILE: process.env.J_NOFILE || '64',                 // 開檔數 (ulimit)
  FSIZE: process.env.J_FSIZE || '1m'                    // 可產生檔案大小
};
const app = express();
const PORT = 3000;

async function runOneTestInContainer(jobDir, timeoutSec = 2) {
  const name = `judge-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const args = [
    'run', '--name', name,
    '--network', 'none',
    '--read-only',
    '--cap-drop=ALL',
    '--security-opt', 'no-new-privileges',
    '--pids-limit', LIMITS.PIDS,
    '--cpus', LIMITS.CPUS,
    '--memory', LIMITS.MEM,
    '--memory-swap', LIMITS.MEM,
    '--ulimit', `nofile=${LIMITS.NOFILE}:${LIMITS.NOFILE}`,
    '--ulimit', `fsize=${parseSize(LIMITS.FSIZE)}`,
    '--tmpfs', '/tmp:rw,noexec,nosuid,nodev,size=16m',
    '--workdir', `/work/${path.basename(jobDir)}`,
    '-v', 'c_compiler_judge_jobs:/work:ro',
    '-u', '1000:1000',
    'debian:bookworm-slim', 'bash', '-lc',
    `timeout ${timeoutSec}s ./main < ./input.txt`
  ];

  // --- 1) 啟動 & 收集輸出 ---
  const child = spawn('docker', args, { stdio: ['ignore', 'pipe', 'pipe'] });
  let stdout = '', stderr = '';
  child.stdout.on('data', d => (stdout += d.toString()));
  child.stderr.on('data', d => (stderr += d.toString()));

  // --- 2) 牆鐘超時（比容器內 timeout 稍長）---
  const wallMs = Math.max(LIMITS.WALL_MS, timeoutSec * 1000 + 300); // 留 300ms 餘裕
  let killedByWall = false;
  const wallTimer = setTimeout(() => {
    killedByWall = true;
    spawn('docker', ['kill', name]);
  }, wallMs);

  // --- 3) 等待結束 / 捕捉 spawn 錯 ---
  const exitMeta = await new Promise(resolve => {
    child.on('error', err => resolve({ code: -1, error: err }));
    child.on('close', (code, signal) => resolve({ code, signal }));
  });
  clearTimeout(wallTimer);

  // --- 4) 判斷 OOM、清理 ---
  const oomKilled = await sh(`docker inspect --format '{{.State.OOMKilled}}' ${name}`).catch(() => 'false');
  await sh(`docker rm -f ${name}`).catch(() => {});

  // --- 5) Verdict 映射 ---
  let verdict = 'OK';
  if (oomKilled.trim() === 'true') {
    verdict = 'MLE';
  } else if (killedByWall) {
    verdict = 'TLE';                          // 我們外部的牆鐘殺掉
  } else if (exitMeta.code === 124) {
    verdict = 'TLE';                          // GNU timeout：逾時回 124
  } else if (exitMeta.code === 137) {
    verdict = 'TLE';                          // 被 KILL(9) 結束（128+9）
  } else if (exitMeta.code !== 0) {
    verdict = 'RE';
  }

  return { stdout: stdout.trim(), stderr: stderr.trim(), verdict };
}

function sh(cmd) {
  return new Promise((res, rej) => {
    const p = spawn('bash', ['-lc', cmd], { stdio: ['ignore','pipe','pipe'] });
    let out = '', err = '';
    p.stdout.on('data', d => out += d.toString());
    p.stderr.on('data', d => err += d.toString());
    p.on('close', c => c === 0 ? res(out) : rej(new Error(err || `exit ${c}`)));
  });
}

// 將 "1m" / "512k" / "123456" 轉成 ulimit 需要的數字（bytes）
function parseSize(v) {
  const m = /^(\d+)([kKmMgG])?$/.exec(String(v).trim());
  if (!m) return v;
  const n = BigInt(m[1]);
  const mul = m[2]?.toLowerCase();
  const factor = mul === 'k' ? 1024n : mul === 'm' ? 1024n**2n : mul === 'g' ? 1024n**3n : 1n;
  return String(n * factor);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
/*
// 原本的測試資料
const testCases = [
    { input: "world", expected: "hello, world" },
    { input: "c++", expected: "hello, c++" },
    { input: "Taiwan", expected: "hello, Taiwan" }
];
*/

//首頁設為 題目的 list
app.get("/", (req, res) => {
    res.redirect("/problem_list");
});

//題目的 list
// 提供前端資料 API
app.get("/api/problem_data", async (req, res) => {
    try {
        const problem_data = await db.getAllQuestions();
        res.json(problem_data);
    } catch (error) {
        res.status(500).json({ error: "資料讀取錯誤" });
    }
});

// 提供 HTML 頁面
app.get("/problem_list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "questions.html"));
});

//寫程式的頁面
app.get("/code_judge_final", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "code_judge_final.html"));
});
app.get("/api/problem/:id", async (req, res) => {
    const q_id = req.params.id;
    const problem = await db.getQuestionById(q_id);
    const example = await db.getExampleById(q_id);
    res.json({problem, example});
});


// 使用者測試的紀錄
app.get("/judge_list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "judge_list.html"));
});

//用範例給的程式碼測試
// 放在 routes 上方：輸出比對的小工具（可共用）
function norm(s) {
  return String(s ?? '')
    .replace(/\r\n/g, '\n').replace(/\r/g, '\n')  // 統一換行
    .replace(/[ \t]+$/gm, '')                     // 每行尾去空白
    .replace(/\n+$/g, '');                        // 去尾端多餘換行
}

// 用範例給的程式碼測試
app.post("/test_example", async (req, res) => {
  try {
    const code = req.body.code;
    const testCases = await db.getExampleCases(req.body.q_id);
    if (!code) return res.status(400).json({ error: "No code provided" });

    // 1) 建 job 目錄
    const jobId = Date.now().toString(36) + Math.random().toString(16).slice(2);
    const JOBS_BASE = "/jobs";
    const jobDir = path.join(JOBS_BASE, jobId);
    fs.mkdirSync(jobDir, { recursive: true });

    // 2) 寫 main.c 並編譯
    const srcPath = path.join(jobDir, "main.c");
    fs.writeFileSync(srcPath, code);
    const exePath = path.join(jobDir, "main");
    await sh(`gcc "${srcPath}" -O2 -s -o "${exePath}"`);

    // 3) 逐筆測資進容器（verdict: OK/MLE/TLE/RE/WA）
    const results = [];
    for (const row of testCases) {
      const input = row.input ?? row.Input ?? "";
      const expected = row.expected ?? row.Output ?? "";

      fs.writeFileSync(path.join(jobDir, "input.txt"), String(input) + "\n");

      const r = await runOneTestInContainer(jobDir, 2); // 2 秒牆鐘（容器內 timeout）

      // 先拿資源判定；若資源 OK 再做輸出比對，失配 → WA
      const rawOut = r.stdout ?? '';
      const rawExp = String(expected ?? '');
      let verdict = r.verdict;
      if (verdict === 'OK' && norm(rawOut) !== norm(rawExp)) verdict = 'WA';

      results.push({
        input,
        expected,
        output: rawOut || null,
        error: r.stderr || null,
        verdict
      });
    }

    res.json({ results });
  } catch (e) {
    res.json({ error: "編譯或執行錯誤：\n" + (e.message || String(e)) });
  }
});

// 繳交程式碼（與上面相同邏輯）
app.post("/submit", async (req, res) => {
  try {
    const code = req.body.code;
    const testCases = await db.getTestCases(req.body.q_id);
    if (!code) return res.status(400).json({ error: "No code provided" });

    // 準備 job 目錄
    const jobId = Date.now().toString(36);
    const JOBS_BASE = "/jobs";
    const jobDir = path.join(JOBS_BASE, jobId);
    fs.mkdirSync(jobDir, { recursive: true });

    // 寫入 main.c 並編譯
    const srcPath = path.join(jobDir, 'main.c');
    fs.writeFileSync(srcPath, code);
    const exePath = path.join(jobDir, 'main');
    await sh(`gcc "${srcPath}" -O2 -s -o "${exePath}"`);

    // 逐筆測資執行
    const results = [];
    for (const { input, expected } of testCases) {
      fs.writeFileSync(path.join(jobDir, 'input.txt'), String(input) + '\n');

      const r = await runOneTestInContainer(jobDir, 2);

      const rawOut = r.stdout ?? '';
      const rawExp = String(expected ?? '');
      let verdict = r.verdict;
      if (verdict === 'OK' && norm(rawOut) !== norm(rawExp)) verdict = 'WA';

      results.push({
        input,
        expected,
        output: rawOut || null,
        error: r.stderr || null,
        verdict
      });
    }

    res.json({ results });
  } catch (e) {
    res.json({ error: "編譯或執行錯誤：\n" + (e.message || String(e)) });
  }
});



// SERVER 啟動
app.listen(PORT, () => {
    console.log(`Judge 伺服器運行在 http://localhost:${PORT}`);
});