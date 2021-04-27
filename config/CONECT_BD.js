const mysql = require('mysql2');

const connection = mysql.createPool({
     host: process.env.host,
     user: process.env.user,
     database: process.env.database,
     password: process.env.password,
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0,
     multipleStatements: true,
});
module.exports = connection;
