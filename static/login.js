document.getElementById("loginForm").addEventListener("submit",async function(e) {
    e.preventDefault(); // 防止表單自動送出
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    console.log("帳號：", username);
    console.log("密碼：", password);
    
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
  
    if (data.success) {
      alert("登入成功，歡迎 " + data.user.usrname);
      location.href = "/problem_list"; // 登入後跳轉頁面
    } else {
      alert("登入失敗：" + data.message);
    }  
    });



