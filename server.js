require('dotenv').config();  // ← 這行一定要在最前面
const { spawn } = require('child_process'); //
const express = require("express");
const db = require('./db'); // db.js 的檔案
const fs = require("fs");
const path = require("path");
//compiler 測試
const { WebSocketServer } = require('ws');
const http = require('http');
const cors = require('cors');


const ragPath = path.join(__dirname, 'routes', 'rag.js'); // ← 路徑要跟真實位置一致
console.log('[RAG path]', ragPath, 'exists?', fs.existsSync(ragPath));

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
const session = require("express-session");

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
    '-v', 'judge_jobs:/work:ro',
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

async function compileInContainer(jobDir, timeoutSec = 5) {
  const name = `cmp-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const args = [
    'run','--name',name,
    '--network','none',
    '--read-only',
    '--cap-drop=ALL',
    '--security-opt','no-new-privileges',
    '--pids-limit', LIMITS.PIDS,
    '--cpus', LIMITS.CPUS,
    '--memory', LIMITS.MEM,
    '--memory-swap', LIMITS.MEM,
    '--ulimit', `nofile=${LIMITS.NOFILE}:${LIMITS.NOFILE}`,
    '--ulimit', `fsize=${parseSize(LIMITS.FSIZE)}`,
    '--tmpfs', '/tmp:rw,nosuid,nodev,size=64m',
    '--workdir', `/work/${path.basename(jobDir)}`,
    // 編譯要能寫出 main，所以這裡用 rw 掛載
    '-v', 'judge_jobs:/work',
    // 為避免 volume 擁有者造成 Permission denied，編譯用 root
    '-u', '0:0',
    // 直接用官方 gcc 映像
    'gcc:13-bookworm', 'bash','-lc',
    `timeout ${timeoutSec}s gcc main.c -O2 -s -o main`
  ];

  const child = spawn('docker', args, { stdio: ['ignore','pipe','pipe'] });
  let stdout = '', stderr = '';
  child.stdout.on('data', d => stdout += d.toString());
  child.stderr.on('data', d => stderr += d.toString());

  const wallMs = Math.max(LIMITS.WALL_MS, timeoutSec * 1000 + 300);
  let killedByWall = false;
  const wallTimer = setTimeout(() => { killedByWall = true; spawn('docker',['kill',name]); }, wallMs);

  const exitMeta = await new Promise(r => {
    child.on('error', err => r({ code: -1, error: err }));
    child.on('close', (code, signal) => r({ code, signal }));
  });
  clearTimeout(wallTimer);

  const oomKilled = await sh(`docker inspect --format '{{.State.OOMKilled}}' ${name}`).catch(()=> 'false');
  await sh(`docker rm -f ${name}`).catch(()=>{});

  let verdict = 'OK';
  if (oomKilled.trim() === 'true') verdict = 'MLE';
  else if (killedByWall)         verdict = 'TLE';
  else if (exitMeta.code === 124) verdict = 'TLE';  // GNU timeout
  else if (exitMeta.code !== 0)   verdict = 'RE';   // 你要顯示「CE」也可以：verdict='CE'

  return { stdout: stdout.trim(), stderr: stderr.trim(), verdict };
}

// 互動執行（WebSocket）— 在 Docker 容器內跑，沿用同一組資源限制
async function runInteractiveInContainer(jobDir, ws, timeoutSec = 30) {
  const name = `repl-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const args = [
    'run', '--name', name,
    '--network', 'none',
    '--read-only',
    '--cap-drop=ALL',
    '--security-opt', 'no-new-privileges',
    '--pids-limit', LIMITS.PIDS,
    '--cpus', LIMITS.CPUS,
    '--memory', LIMITS.MEM,           // 有設 --memory 時，超限會變 OOMKilled 可由 inspect 判斷
    '--memory-swap', LIMITS.MEM,
    '--ulimit', `nofile=${LIMITS.NOFILE}:${LIMITS.NOFILE}`,
    '--ulimit', `fsize=${parseSize(LIMITS.FSIZE)}`,
    '--tmpfs', '/tmp:rw,noexec,nosuid,nodev,size=16m',
    '--workdir', `/work/${path.basename(jobDir)}`,
    '-v', 'judge_jobs:/work:ro',      // 跟 judge 相同：唯讀掛載 /jobs
    '-u', '1000:1000',
    // 互動模式要 -i，但不要 -t（TTY），這樣 stdin 可直接寫入
    '-i', 'debian:bookworm-slim', 'bash', '-lc',
    // 用 stdbuf 讓 stdout 不中途緩衝；此處不包 coreutils timeout，牆鐘由外層 setTimeout 控管
    'stdbuf -o0 ./main'
  ];

  const child = spawn('docker', args, { stdio: ['pipe', 'pipe', 'pipe'] });

  // 將容器輸出轉給瀏覽器
  child.stdout.on('data', d => ws.readyState === 1 && ws.send(d.toString()));
  child.stderr.on('data', d => ws.readyState === 1 && ws.send(d.toString()));

  // 把使用者在 xterm 的輸入寫進容器 stdin
  const onWS = msg => child.stdin.write(msg);
  ws.on('message', onWS);

  // --- 單一路徑結束：避免你看到的「OK」後又多一行 [TLE] ---
  let ended = false;
  const end = async (tag = '') => {
    if (ended) return;
    ended = true;
    clearTimeout(wallTimer);
    ws.off('message', onWS);

    // 查 OOMKilled（若為 true 就覆寫成 MLE）
    let tag2 = tag;
    try {
      const oom = await sh(`docker inspect --format '{{.State.OOMKilled}}' ${name}`);
      if (oom.trim() === 'true') tag2 = 'MLE';
    } catch {}

    await sh(`docker rm -f ${name}`).catch(()=>{});
    if (ws.readyState === 1) ws.send(`\n===[程式結束 ${tag2}]===\n`);
  };

  // 子行程結束（若被我們外部 kill，Linux 常見 137=128+9 可視情況想轉成 TLE）
  child.on('close', code => {
    // 這裡沒有用到內層 `timeout`，若是我們的牆鐘 kill，end 會先被呼叫
    end(code === 137 ? 'TLE' : '');   // 137 常見於收到 KILL(9)。GNU timeout 逾時則會回 124。:contentReference[oaicite:0]{index=0}
  });
  child.on('error', () => end('ERR'));

  // 牆鐘時間（比 judge 的 LIMITS.WALL_MS 邏輯一致）
  const wallTimer = setTimeout(() => {
    // 逾時就殺容器 → child 'close' 會隨後觸發，但我們保險直接標記 TLE
    sh(`docker kill ${name}`).catch(()=>{});
    end('TLE');
  }, Math.max(timeoutSec * 1000, LIMITS.WALL_MS));
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

app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type']
})); // ← 允許跨源，含 preflight

app.use(express.json());
let ragRouter;
try {
  ragRouter = require(ragPath);
  console.log('[RAG router loaded]', typeof ragRouter, ragRouter?.stack?.length);
  app.use('/rag', ragRouter);
} catch (e) {
  console.error('[RAG router failed to load]', e);
}
app.use(express.static(path.join(__dirname, "static")));
app.use(session({                       
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// OpenAI 設定
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 首頁導向題目列表
app.get("/", (req, res) => {
  res.redirect("/problem_list");
});

app.get('/home',(req,res) => {
    res.redirect("/problem_list");
});

app.get("/user_info", (req, res)=> {
    const user = req.session.user;
    res.render("user_info", { user });
});

// 程式追蹤
app.post('/receive_code',(req,res) =>{
    const code = req.body.code
    req.session.traceCode = code;
    // console.log(`trace receive${code}`)
    res.redirect('/trace'); 
})

app.get('/trace', (req, res) => {
    const code = req.session.traceCode || "";
    res.render("code_trace", { code });
  });

// 登入功能
app.get("/login_page", (req, res)=> {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(`接收到帳號:${username},密碼:${password}`)
    try {
        const user = await db.loginUser(username, password);
  
        if (user) {
            console.log(`${user.uid},111111111111`)
            console.log(`${user.usrname},111111111111`)
            console.log(`${user.usr_group},111111111111`)
            req.session.user = {
              uid: user.uid,
              usrname: user.usrname,
              usr_group: user.usr_group
            };
            res.json({ success: true, user: req.session.user });
          } else {
            res.status(401).json({ success: false, message: "帳號或密碼錯誤" });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "伺服器錯誤" });
        }
      });
  
  // 查看目前登入狀態
  app.get("/me", (req, res) => {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
  });
  
  // 登出
  app.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ success: true });
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

// 題目列表頁面
app.get("/problem_list", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "questions.html"));
});

// 寫程式頁面
app.get("/code_judge_final", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "code_judge_final.html"));
});

//抓取使用者再資料庫的程式碼
app.post('/api/user-code', async (req, res) => {
  const q_id = req.body.q_id;
  const user = req.session.user;
  if (!user || !user.uid) {
    return res.status(401).json({ error: "未登入" });
  }
  try {
    const rows = await db.userInputCode(user.uid, q_id);
    if (rows.length > 0) {
      res.json({ code: rows[0].code });
    } else {
      res.json({ code: "" });
    }
  } catch (err) {
    res.status(500).json({ error: "資料庫錯誤" });
  }
});

// 儲存使用者程式碼
app.post('/api/save-code', async (req, res) => {
  const user = req.session.user;
  if (!user || !user.uid) {
    return res.status(401).json({ error: "未登入" });
  }
  const code = req.body.code;
  const q_id = req.body.q_id;
  if (!code || !q_id) {
    return res.status(400).json({ error: "缺少程式碼或題號" });
  }
  try {
    // 先查有沒有
    const rows = await db.getUserCodeByUidQid(user.uid, q_id);
    if (rows.length > 0) {
      // 有就更新
      await db.updateUserCode(code, user.uid, q_id);
    } else {
      // 沒有就新增
      await db.insertUserCode(code, user.uid, q_id);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "資料庫錯誤" });
  }
});

// 根據題目 id 取得題目與範例
app.get("/api/problem/:id", async (req, res) => {
  const q_id = req.params.id;
  const problem = await db.getQuestionById(q_id);
  const example = await db.getExampleById(q_id);
  res.json({ problem, example });
});

// 使用者測試紀錄頁面
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

// 即時語法偵測功能
app.post("/api/check-syntax", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    // 建立臨時檔案進行語法檢查
    const tempId = Date.now().toString(36) + Math.random().toString(16).slice(2);
    const tempDir = path.join("/tmp", `syntax-check-${tempId}`);
    fs.mkdirSync(tempDir, { recursive: true });
    
    const srcPath = path.join(tempDir, "main.c");
    fs.writeFileSync(srcPath, code);

    // 使用 gcc 進行語法檢查（只檢查語法，不產生執行檔）
    const result = await new Promise((resolve) => {
      const gcc = spawn('gcc', ['-fsyntax-only', '-Wall', '-Wextra', srcPath], {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let stderr = '';
      gcc.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      gcc.on('close', (code) => {
        // 清理臨時檔案
        fs.rmSync(tempDir, { recursive: true, force: true });
        
        if (code === 0) {
          resolve({ 
            valid: true, 
            errors: [], 
            warnings: [],
            message: "語法檢查通過" 
          });
        } else {
          // 解析 gcc 錯誤訊息
          const errors = parseGCCErrors(stderr);
          resolve({ 
            valid: false, 
            errors: errors.errors,
            warnings: errors.warnings,
            message: "發現語法錯誤" 
          });
        }
      });

      gcc.on('error', (err) => {
        fs.rmSync(tempDir, { recursive: true, force: true });
        resolve({ 
          valid: false, 
          errors: [{ line: 0, message: "編譯器錯誤: " + err.message }],
          warnings: [],
          message: "編譯器錯誤" 
        });
      });
    });

    res.json(result);
  } catch (error) {
    console.error("語法檢查錯誤:", error);
    res.status(500).json({ 
      valid: false, 
      errors: [{ line: 0, message: "伺服器錯誤: " + error.message }],
      warnings: [],
      message: "伺服器錯誤" 
    });
  }
});

// 解析 GCC 錯誤訊息的輔助函數
function parseGCCErrors(stderr) {
  const errors = [];
  const warnings = [];
  
  // GCC 錯誤訊息格式: filename:line:column: error: message
  const lines = stderr.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    const match = line.match(/main\.c:(\d+):(\d+):\s*(error|warning):\s*(.+)/);
    if (match) {
      const [, lineNum, column, type, message] = match;
      const errorInfo = {
        line: parseInt(lineNum),
        column: parseInt(column),
        message: message.trim()
      };
      
      if (type === 'error') {
        errors.push(errorInfo);
      } else if (type === 'warning') {
        warnings.push(errorInfo);
      }
    }
  }
  
  return { errors, warnings };
}

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

//compiler 測試
app.post('/save', (req, res) => {
  const code = req.body.code;
  fs.writeFileSync('main.c', code);
  res.json({ status: 'ok' });
});

const server = http.createServer(app); // 建立 HTTP server (server 連線問題)
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', async (ws) => {
  console.log('✅ WebSocket client connected');

  // 每次連線開一個 job 目錄，把 /app/main.c 複製進去
  const jobId = Date.now().toString(36) + Math.random().toString(16).slice(2);
  const jobDir = path.join('/jobs', jobId);
  fs.mkdirSync(jobDir, { recursive: true });
  try { fs.copyFileSync('main.c', path.join(jobDir, 'main.c')); } catch (e) {
    ws.send('找不到 main.c，請先按「執行程式」或儲存程式碼。\n');
    ws.close();
    return;
  }

  // 在受限容器裡編譯
  const r = await compileInContainer(jobDir, 10);
  if (r.stdout) ws.send(r.stdout + '\n');
  if (r.stderr) ws.send(r.stderr + '\n');

  if (r.verdict !== 'OK') {
    ws.send(`[${r.verdict}] 編譯未通過\n`);
    ws.close();
    return;
  }
  ws.send('✅ 編譯成功\n');

  // 編譯成功 → 受限容器互動執行（stdin/stdout 綁到此 ws）
  await runInteractiveInContainer(jobDir, ws, 30);
});
app.get('/rag/health', (req,res)=>res.json({ ok:true, from:'server.js' }));//可刪



app.use((req, res) => res.status(404).send('Not Found'));

server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
