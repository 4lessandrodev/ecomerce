const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'mysql.fazendautopia.com.br',
  user: 'fazendautopia',
  database: 'fazendautopia',
  password: 'databaseFarm01',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true
});
module.exports = connection;
