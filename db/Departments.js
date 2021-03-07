// get the client
const mysql = require('mysql2');
const password = require('../password');
const cTable = require('console.table');
const UI = require('../ulits/UI');

class Departments  {
    constructor() {
        this.data = []
    }
    viewDepartments() {
        // create the connection
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query("SELECT * FROM departments;")
            .then(([rows, fields]) => {
                new UI().displayDblBreak();
                console.table(rows);
                new UI().displayDblBreak();
            })
            .catch(console.log)
            .then(() => con.end());
    }
}

module.exports = Departments;