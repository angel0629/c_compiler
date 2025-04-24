const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  port:'3306',
  user: 'root',
  password: '',
  database: 'judge_questions'
});

// 用 promise 包裝（可以用 async/await）
const promisePool = pool.promise();

module.exports = {
    getTestCases: async () => { 
        const [rows] = await promisePool.query('SELECT Input, Output FROM `test` WHERE q_id=1');
      
        const testCases = rows.map(row => ({
          input: row.Input,
          expected: row.Output
        }));
      
        return testCases;
    },
    //題目 info
    getQuestionById: async (q_id) => { 
      const [rows] = await promisePool.query('SELECT id, no, name, info,Input_info, Output_info FROM `questions` WHERE id = ?', [q_id]);
      return rows[0];
    },
    //題目輸入輸出範例
    getExampleById: async (q_id) => { 
      const [rows] = await promisePool.query('SELECT Input, Output FROM `example` WHERE q_id = ?', [q_id]);
      return rows;
    },      
    //選出全部的題目
    getAllQuestions: async () => { 
      const [rows] = await promisePool.query('SELECT id, no,name FROM `questions`;');
      return rows;
    }
};
