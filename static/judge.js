// problem_list 抓所有題目
async function fetchProblems() {
    const res = await fetch('/api/problem_data'); // 從後端 API 抓資料
    const data = await res.json();
    function selectQuestion(id) {
        window.location.href = "/code_judge_final?q_id=" + id;
      }
    const tbody = document.getElementById('show_list');

    data.forEach(problem => {
        const item = document.createElement("div");
        item.className = "question-item";
        item.onclick = () => selectQuestion(problem.no);
        item.innerHTML = `
          <div class="question-id">#${problem.no}</div>
          <div class="question-title">${problem.name}</div>
        `;
        tbody.appendChild(item);
        
    });
}
fetchProblems();


// 以 q_id 抓題目資料
// 取得 URL 中的參數
const urlParams = new URLSearchParams(window.location.search);
const q_id = urlParams.get('q_id');

async function fetchProblem() {
    const res = await fetch(`/api/problem/${q_id}`);
    const data = await res.json();

    document.getElementById('info').textContent = data.problem.info;
    document.getElementById('input_info').textContent = data.problem.Input_info;
    document.getElementById('output_info').textContent = data.problem.Output_info;
    console.log('q_id:', q_id); // 如果是 null 就代表網址沒帶參數
    

    //範例輸入輸出
    const tbody = document.getElementById('show_info_list');
    data.example.forEach(i => {
    const tr = document.createElement('tr');

    // 範例輸入
    const In_example = document.createElement('td');
    In_example.textContent = i.Input;

    // 範例輸出
    const Out_example = document.createElement('td');
    Out_example.textContent = i.Output;

    // 組合這列
    tr.appendChild(In_example);
    tr.appendChild(Out_example);

    // 加進 tbody
    tbody.appendChild(tr);
    });
}
fetchProblem();


//按下 submit 按鈕後
async function submitAnswer() {
    console.log("code");
    const code = editor.getValue();
    //const code = document.getElementById("codeInput"); // 刪掉 .value
    console.log(code);
    const response = await fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code,q_id })
    });

    const result = await response.json();
    const outputElement = document.getElementById("judge_output");
    outputElement.innerText = "";
    outputElement.className = "";//清除背景顏色


    if (result.error) {
        outputElement.innerText = result.error;
        return;
    }
    let allPassed = true;
    result.results.forEach(({ input, expected, output, error }) => {
        outputElement.innerText += `輸入: ${input}\n`;
        outputElement.innerText += `正確輸出： ${expected}\n`;
        outputElement.innerText += `實際輸出： ${output || "執行錯誤"}\n`;

        if (error || output!== expected){
            allPassed = false;
        }

        if (error) outputElement.innerText += `ERROR: ${error}\n`;
        outputElement.innerText += "-------------------------\n";

    });

    if (allPassed) {
        //outputElement.innerText += "\nJudge 通過 ✅";
        const img = document.createElement("img");
        img.src = "judge_success.jpg";
        img.style.width = "150px"; // 自訂大小
        outputElement.appendChild(img);
        outputElement.classList.add("pass");
    } else {
    //outputElement.innerText += "\nJudge 沒通過 ❌";
        const img = document.createElement("img");
        img.src = "judge_failed.jpg";
        img.style.width = "150px"; // 自訂大小
        outputElement.appendChild(img);
        outputElement.classList.add("fail");
    }
}