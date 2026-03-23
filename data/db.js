const mysql = require('mysql2/promise');

const dbConfiguration = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
}

const dbConnection = mysql.createPool(dbConfiguration); 

module.exports = dbConnection;