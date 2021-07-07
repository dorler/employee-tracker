// define the connections in the database
const mysql = require("mysql");


// Create the connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Harlow071720*',
    database: 'employees'
});

connection.connect();

module.exports = connection;