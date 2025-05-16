// Connect DB
const mysql = require('mysql2')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"toko"
})

module.exports = db;