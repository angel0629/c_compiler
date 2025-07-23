require('dotenv').config(); // 一定要放最前面，先載入環境變數

const express = require("express");
const db = require('./db'); // db.js 的檔案
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const { Configuration, OpenAIApi } = require('openai');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // 啟用跨域
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

// OpenAI 設定
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 首頁導向題目列表
app.get("/", (req, res) => {
  res.redirect("/problem_list");
});

// 題目列表 API
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

// 用範例測資測試程式碼
app.post("/test_example", async (req, res) => {
  const code = req.body.code;
  const testCases = await db.getExampleCases(req.body.q_id);

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const filePath = path.join(__dirname, "main.c");
  fs.writeFileSync(filePath, code);

  const tempDir = path.join(__dirname, "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  exec(`gcc ${filePath} -o ${tempDir}/main.exe`, (compileErr, _, compileStderr) => {
    if (compileErr) {
      return res.json({ error: "編譯錯誤：\n" + compileStderr });
    }

    let results = [];
    let completed = 0;

    testCases.forEach(({ input, expected }, index) => {
      const process = exec(`${tempDir}/main.exe`, { timeout: 2000 });

      process.stdin.write(input + "\n");
      process.stdin.end();

      let output = "";

      process.stdout.on("data", (data) => {
        output += data;
      });

      process.stderr.on("data", (data) => {
        results[index] = { input, expected, output: null, error: data.trim() };
        completed++;
        checkCompletion();
      });

      process.on("close", () => {
        results[index] = { input, expected, output: output.trim(), error: null };
        completed++;
        checkCompletion();
      });

      function checkCompletion() {
        if (completed === testCases.length) {
          res.json({ results });
        }
      }
    });
  });
});

// 繳交程式碼
app.post("/submit", async (req, res) => {
  const code = req.body.code;
  const testCases = await db.getTestCases(req.body.q_id);

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const filePath = path.join(__dirname, "main.c");
  fs.writeFileSync(filePath, code);

  const tempDir = path.join(__dirname, "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  exec(`gcc ${filePath} -o ${tempDir}/main.exe`, (compileErr, _, compileStderr) => {
    if (compileErr) {
      return res.json({ error: "編譯錯誤：\n" + compileStderr });
    }

    let results = [];
    let completed = 0;

    testCases.forEach(({ input, expected }, index) => {
      const process = exec(`${tempDir}/main.exe`, { timeout: 2000 });

      process.stdin.write(input + "\n");
      process.stdin.end();

      let output = "";

      process.stdout.on("data", (data) => {
        output += data;
      });

      process.stderr.on("data", (data) => {
        results[index] = { input, expected, output: null, error: data.trim() };
        completed++;
        checkCompletion();
      });

      process.on("close", () => {
        results[index] = { input, expected, output: output.trim(), error: null };
        completed++;
        checkCompletion();
      });

      function checkCompletion() {
        if (completed === testCases.length) {
          res.json({ results });
        }
      }
    });
  });
});

// ChatGPT 小助手路由
app.post('/gpt', async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages,
      temperature : 0.7
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ reply: '伺服器錯誤，請稍後再試。' });
  }
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Judge 伺服器運行在 http://localhost:${PORT}`);
});
