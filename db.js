const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'judge_questioins'
});

// 用 promise 包裝（可以用 async/await）
const promisePool = pool.promise();

module.exports = {
  getAllUsers: async () => {
    const [rows] = await promisePool.query('SELECT * FROM users');
    return rows;
  },

  getUserById: async (id) => {
    const [rows] = await promisePool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // 你可以繼續加其他查詢
};
