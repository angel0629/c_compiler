const { spawn } = require('child_process'); //
const express = require("express");
const db = require('./db'); // db.js 的檔案
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

//compiler 測試
const { WebSocketServer } = require('ws');
const http = require('http');


const app = express();
const PORT = 3000;
const session = require("express-session");


// app.use(cors()); // 啟用跨域
app.use(express.json());
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

//compiler 測試
app.post('/save', (req, res) => {
  const code = req.body.code;
  fs.writeFileSync('main.c', code);
  res.json({ status: 'ok' });
});

const server = http.createServer(app); // 建立 HTTP server (server 連線問題)
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('✅ WebSocket client connected');

  const compile = spawn('gcc', ['main.c', '-o', 'main']);

  compile.stderr.on('data', (data) => {
    ws.send(data.toString());
  });

  compile.on('close', (code) => {
    if (code !== 0) {
      ws.send("\n❌ 編譯失敗，code: ${code}");
      return;
    }

    const run = spawn('stdbuf', ['-o0', './main'], { shell: true });

    run.stdout.on('data', (data) => ws.send(data.toString()));
    run.stderr.on('data', (data) => ws.send(data.toString()));

    ws.on('message', (msg) => {
      console.log('收到訊息:', msg.toString());  // 加上這行看有沒有收到
      run.stdin.write(msg);
    });

    run.on('close', (code) => {
      ws.send("===[程式結束]===\n");
    });
  });
});

server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
