const express = require("express");
const db = require('./db'); //db.js 的檔案
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

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
    res.sendFile(path.join(__dirname, "views", "problem_list.html"));
});

//寫程式的頁面
app.get("/code_judge", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "code_judge.html"));
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



app.post("/submit", async(req, res) => {
    const code = req.body.code;
    testCases = await db.getTestCases(); //FIXME:可以新增q_id
    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    //把使用者輸入存入 main.c
    const filePath = path.join(__dirname, "main.c");
    fs.writeFileSync(filePath, code);

    //確保 temp 目錄存在
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    //編譯 C 語言程式碼
    exec(`gcc ${filePath} -o ${tempDir}/main.exe`, (compileErr, _, compileStderr) => {
        if (compileErr) {
            return res.json({ error: "編譯錯誤：\n" + compileStderr });
        }

        //依次執行每個測資
        let results = [];
        let completed = 0;

        testCases.forEach(({ input, expected }, index) => {
            const process = exec(`${tempDir}/main.exe`, { timeout: 2000 });

            //將輸入值傳入程式
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



// SERVER 啟動
app.listen(PORT, () => {
    console.log(`Judge 伺服器運行在 http://localhost:${PORT}`);
});