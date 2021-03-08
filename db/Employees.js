// get the client
const mysql = require('mysql2');
const password = require('../password');
const cTable = require('console.table');
const UI = require('../ulits/UI');
const inquirer = require('inquirer');
const displayPrompt = require('./QuestionPrompt')

class Employees {
    constructor() {
        this.data = [];
    }
    viewEmployees() {
        // create the connection
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.department_name as department, role.salary, CONCAT(e.first_name, " ", e.last_name) as manager
        FROM employee
        inner join role ON (employee.role_id = role.id)
        inner join departments on role.department_id = departments.id
        left join employee as e on employee.manager_id = e.id;`)
            .then(([rows, fields]) => {
                new UI().displaySingBreak()
                console.table(rows);
                new UI().displayDblBreak()
            })
            .catch(console.log)
            .then(() => con.end());
    }

    addEmployee(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name
        this.last_name = last_name
        this.role_id = role_id
        this.manager_id = manager_id
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                Values
                ('${this.first_name}', '${this.last_name}', ${this.role_id}, ${this.manager_id});
                `)
            .catch(console.log)
            .then(() => con.end());

    }

    initiateEmployeeUpdate() {
        let employeeID;
        let roleID;
        let choiceData2;

        // RETURNS ROLES TO SELECT FROM 
        const con1 = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con1.promise().query(`
        SELECT id, title FROM role;
                `)
            .catch(console.log)
            .then(([rows, fields]) => {
                choiceData2 = rows.map(el => (el.id + ' ' + ' ' + el.title))
            })
            .then(() => con1.end());

        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
        SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee;
                `)
            .catch(console.log)
            .then(([rows, fields]) => {
                const choiceData = rows.map(el => (el.id + ' ' + ' ' + el.name))
                console.log(choiceData)
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: 'Select an employee from the list below.',
                        choices: choiceData
                    },
                    {
                        type: 'list',
                        name: 'action2',
                        message: 'Select a new Role from the list below.',
                        choices: choiceData2,
                        when: ({ action }) => action,
                    },
                ]).then(({ action, action2 }) => {
                    this.action = action
                    employeeID = this.action.split(' ', 1)

                    this.action2 =action2
                    roleID = this.action2.split(' ', 1)
                    if (this.action2){
                        console.log (roleID)
                    }

                })
            })
            .then(() => con.end())
    }
}

// ]).then(({ action2 }) => {
//     this.action2 = action2
//     console.log(this.action2)
//     roleID = this.action2.split(' ', 1)
//     console.log(roleID)

// })
// inquirer.prompt([
//     {
//         type: 'list',
//         name: 'action2',
//         message: 'Select an employee from the list below.',
//         choices: choiceData
//     },
// ]).then(({ action2 }) => {
//     this.action2 = action2
//     employeeID = this.action.split(' ', 1)
// })



module.exports = Employees;

//SQL to update employee
// UPDATE employee SET role_id = ${}
// WHERE id = ${};

//SQL to retrieve employees by name
// SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) as employee FROM employee LEFT JOIN employee as e on employee.id = e.id ;