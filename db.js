const mysql = require('mysql2');

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 用 promise 包裝（可以用 async/await）
const promisePool = pool.promise();

module.exports = {
    getTestCases: async (q_id) => { 
        const [rows] = await promisePool.query('SELECT Input, Output FROM `test` WHERE q_id=?', [q_id]);
      
        const testCases = rows.map(row => ({
          input: row.Input,
          expected: row.Output
        }));
      
        return testCases;
    },
    getExampleCases: async (q_id) => { 
      const [rows] = await promisePool.query('SELECT Input, Output FROM `example` WHERE q_id=?', [q_id]);
    
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
    },
    // 登入
    loginUser: async (username, password) => {
      const [rows] = await promisePool.query(
        'SELECT uid, usrname, usr_group FROM user WHERE usrname = ? AND pwd = ?',
        [username, password]
      );
      return rows[0] || null;  // null or user info
    },
    //使用者的 code
    userInputCode: async (u_id, q_id) => { 
      const [rows] = await promisePool.query('SELECT code FROM `code` WHERE u_id=? AND q_id=?;',[u_id, q_id]);
      return rows;
    },

    //儲存程式碼
    //更新
    updateUserCode: async (code, uid, q_id) => {
      return promisePool.query('UPDATE code SET code=? WHERE u_id=? AND q_id=?', [code, uid, q_id]);
    },
    //新增
    insertUserCode: async (code, uid, q_id) => {
      return promisePool.query('INSERT INTO code (code, u_id, q_id) VALUES (?, ?, ?)', [ code, uid, q_id]);
    },
    //查詢是否已經存在
    getUserCodeByUidQid: async (uid, q_id) => {
    const [rows] = await promisePool.query(
    'SELECT * FROM code WHERE u_id=? AND q_id=?',[uid, q_id]);
    return rows;
    },
};
