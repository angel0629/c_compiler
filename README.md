# C 語言線上 AI 互動學習平台
```
c_compiler/
├── templates/
│   ├── login.html
│   ├── register.html
│   ├── test_page.html            # 列出所有題目
│   └── index.html                # 主頁面，包含所有元件容器
├── static/
│   └── js/
│       ├── compiler.js          # 線上編譯器
│       ├── judge.js             # 程式執行/送出
│       ├── ai_bot.js            # AI 小助手
│       └── feedback.js          # 即時偵測
├── backend/
│   ├── app.py                   # 主要進入點
│   └── ...
├── db.sql                      # 放題目資料庫
```
**Docker 小筆記**
- 下載 Docker：https://www.docker.com/products/docker-desktop/
- 執行(在目標專案資料夾中開啟 CMD)：`docker-compose up --build`
- 更改了 Dockerfile 後重 run Docker：`docker-compose down -v` 再 `docker-compose up --build`
