
const express = require('express');
const fs = require('fs');
const {exec} = require('child_process');// gcc
const cors = require('cors');//gcc
const path = require('path');
const app = express();

app.use(cors());//gcc
app.use(express.json());

// 提供靜態檔案
app.use(express.static('.'));

// GCC 語法檢查 API
app.post('/check', (req, res) => {
  const code = req.body.code;
  fs.writeFileSync('main.c', code);
  exec('gcc -fsyntax-only main.c', (err, stdout, stderr) => {
    if (err) {
      return res.json({success: false, error: stderr});    }
    res.json({success: true});
  });
});

// 主頁面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'compiler.html'));
});

app.listen(3000, () => {
  console.log('✅ GCC 語法偵錯 API 已啟動：http://localhost:3000');
  console.log('🌐 編譯器頁面：http://localhost:3000/compiler.html');
});
