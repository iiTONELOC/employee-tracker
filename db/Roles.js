// get the client
const mysql = require('mysql2');
const password = require('../password');
const cTable = require('console.table');
const UI = require('../ulits/UI');

class Role {
    constructor(){
        this.data=[];
    }
    viewRole () {
        // create the connection
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query("SELECT * FROM role;")
            .then(([rows, fields]) => {
                new UI().displaySingBreak()
                console.table(rows);
                new UI().displayDblBreak()
            })
            .catch(console.log)
            .then(() => con.end());
    }

    addRole(title, salary, department) {
        this.title = title
        this.salary = salary
        this.department = department
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                INSERT INTO role (title, salary, department_id)
                Values
                ('${this.title}', ${this.salary}, ${this.department});
                `)
            .catch(console.log)
            .then(() => con.end());
        
    }
}


module.exports = Role;
