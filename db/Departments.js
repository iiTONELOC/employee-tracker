// get the client
const mysql = require('mysql2');
const password = require('../password')
const cTable = require('console.table');
const inquirer = require('inquirer');



class Departments {
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
                console.log(`\n`)
                console.table(rows);
                console.log(`\n`)
            })
            .catch(console.log)
            .then(() => con.end());
    }

    addDepartment(data) {
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                INSERT INTO departments (department_name)
                Values
                ('${data}');`).then(() => {
            console.log(`\nSuccess!\n${data} was added to Departments\n`);
            const displayPrompt = require('../lib/QuestionPrompt')
            return displayPrompt();
        })
            .catch(console.log)
            .then(() => con.end());

    }
    deleteDepartment(data, department) {
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                DELETE FROM departments WHERE id = ${data}`).then(() => {
            console.log(`\nSuccess!\n${department} was removed from Departments\n`);
            const displayPrompt = require('../lib/QuestionPrompt')
            return displayPrompt();
        })
            .catch(console.log)
            .then(() => con.end());
    }
    deleteDepartmentInit() {
        console.log(`\nYou selected to delete a department!\n`)
        // create the connection
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query("SELECT * FROM departments;")
            .then(([rows, fields]) => {
                const choiceData = rows.map(el => (el.id + ' ' + el.department_name))

                if (choiceData === undefined) {
                    new Departments().deleteDepartmentInit()
                } else {
                    inquirer.prompt([
                        {   // RETURNS THE NAMES OF THE Departments IN A LIST 
                            type: 'list',
                            name: 'selectDepartment',
                            message: 'Select the department you wish to delete',
                            choices: choiceData,
                        },
                    ])
                        .then(({ selectDepartment }) => {
                            let departmentID = selectDepartment.split(' ', 1)
                            new Departments().deleteDepartment(departmentID,selectDepartment)
                        })
                }
            })
            .catch(console.log)
            .then(() => con.end());
    }
}

module.exports = Departments;