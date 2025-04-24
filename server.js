const express = require("express");
const db = require('./db'); //db.js 的檔案
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "static"))); // 提供静态文件
// 题目的标准测试用例
/*
const testCases = [
    { input: "world", expected: "hello, world" },
    { input: "c++", expected: "hello, c++" },
    { input: "Taiwan", expected: "hello, Taiwan" }
];
*/

// 首页重定向到 problem_list
app.get("/", (req, res) => {
    res.redirect("/problem_list");
});

// 题目列表
app.get("/problem_list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "problem_list.html"));
});

// 代码判题页面
app.get("/code_judge", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "code_judge.html"));
});

// 评测列表
app.get("/judge_list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "judge_list.html"));
});



app.post("/judge", async(req, res) => {
    const code = req.body.code;
    testCases = await db.getTestCases(); //FIXME:可以新增q_id
    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }

    // 保存 C 代码到文件
    const filePath = path.join(__dirname, "main.c");
    fs.writeFileSync(filePath, code);

    // 确保 temp 目录存在
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    // 编译 C 代码
    exec(`gcc ${filePath} -o ${tempDir}/main.exe`, (compileErr, _, compileStderr) => {
        if (compileErr) {
            return res.json({ error: "編譯錯誤：\n" + compileStderr });
        }

        // 依次运行测试用例
        let results = [];
        let completed = 0;

        testCases.forEach(({ input, expected }, index) => {
            const process = exec(`${tempDir}/main.exe`, { timeout: 2000 });

            // 将输入传入可执行文件
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