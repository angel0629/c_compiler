// async function login(){
//     console.log("btn clicked")
//     const res = await fetch('/login_page'); 
//     console.log(res)
//     window.location.href = res.url
// }

const loginBtn = document.querySelector('.signin-button')

async function checkLoginStatus() {
    console.log("function excuted")
    try {
      const res = await fetch("/me");
      const data = await res.json();
      // console.log(data.loggedIn)
      return data.loggedIn;
    } 
    catch (err) {
      console.error("檢查登入狀態失敗", err);
    }
  }
  
async function setupLoginButton() {
    const loggedIn = await checkLoginStatus();

    if (loggedIn) {
        loginBtn.textContent = "登出";
        loginBtn.onclick = async () => {
        await fetch("/logout", { method: "POST" });
        alert("已登出");
        location.reload();
        };
    } else {
        loginBtn.textContent = "登入";
        loginBtn.onclick = async () => {
        const res = await fetch('/login_page');
        window.location.href = res.url;
        };
    }
}

// 初始化執行
setupLoginButton();


async function check_usr_info() {
  const res = await fetch('/user_info');
  window.location.href = res.url;
}

async function home_page(){
  const res = await fetch('/home');
  window.location.href = res.url;
}


// 追蹤程式
async function traceCode() {
  const code = editor.getValue();
  // console.log(code)
  const res = await fetch('/receive_code', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ code })
  });

  if (res.redirected) {
    window.location.href = res.url;
  }
}


