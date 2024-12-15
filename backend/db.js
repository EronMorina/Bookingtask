const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql',           // Replace with your database host
  user: 'my_user',         // Replace with your database username
  password: 'my_password', // Replace with your database password
  database: 'my_database', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
