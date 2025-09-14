require('dotenv').config();                   // 防止載入順序問題（雙保險）
const mysql = require('mysql2/promise');      // ← 用 promise 版 + 連線池

const { DB_HOST, DB_PORT = 3306, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
for (const k of ['DB_HOST','DB_USER','DB_PASSWORD','DB_NAME']) {
  if (!process.env[k]) throw new Error(`Missing ${k} in .env`);
}

const pool = mysql.createPool({               // ← 建議用 pool（穩定又省時）
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});



module.exports = {
    getTestCases: async (q_id) => { 
        const [rows] = await pool.query('SELECT Input, Output FROM `test` WHERE q_id=?', [q_id]);
        return rows.map(r => ({ input: r.Input, expected: r.Output }));
    },
    getExampleCases: async (q_id) => {  
      const [rows] = await pool.query('SELECT Input, Output FROM `example` WHERE q_id=?', [q_id]);
    
      const testCases = rows.map(row => ({
        input: row.Input,
        expected: row.Output
      }));
    
      return testCases;
  },
    //題目 info
    getQuestionById: async (q_id) => { 
      const [rows] = await pool.query('SELECT id, no, name, info,Input_info, Output_info FROM `questions` WHERE id = ?', [q_id]);
      return rows[0];
    },
    //題目輸入輸出範例
    getExampleById: async (q_id) => { 
      const [rows] = await pool.query('SELECT Input, Output FROM `example` WHERE q_id = ?', [q_id]);
      return rows;
    },      
    //選出全部的題目
    getAllQuestions: async () => { 
      const [rows] = await pool.query('SELECT id, no,name FROM `questions`;');
      return rows;
    },
    // 登入
    loginUser: async (username, password) => {
      const [rows] = await pool.query(
        'SELECT uid, usrname, usr_group FROM user WHERE usrname = ? AND pwd = ?',
        [username, password]
      );
      return rows[0] || null;  // null or user info
    },
    //使用者的 code
    userInputCode: async (u_id, q_id) => { 
      const [rows] = await pool.query('SELECT code FROM `code` WHERE u_id=? AND q_id=?;',[u_id, q_id]);
      return rows;
    },

    //儲存程式碼
    //更新
    updateUserCode: async (code, uid, q_id) => {
      return pool.query('UPDATE code SET code=? WHERE u_id=? AND q_id=?', [code, uid, q_id]);
    },
    //新增
    insertUserCode: async (code, uid, q_id) => {
      return pool.query('INSERT INTO code (code, u_id, q_id) VALUES (?, ?, ?)', [ code, uid, q_id]);
    },
    //查詢是否已經存在
    getUserCodeByUidQid: async (uid, q_id) => {
    const [rows] = await pool.query(
    'SELECT * FROM code WHERE u_id=? AND q_id=?',[uid, q_id]);
    return rows;
    },
};
