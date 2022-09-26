const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'balkon',
  password: 'laptop123',
});

module.exports = pool.promise();
