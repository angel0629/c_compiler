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
      }
  /*
  getUserById: async (id) => {
    const [rows] = await promisePool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },
    */
};
