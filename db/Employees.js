// get the client
const mysql = require('mysql2');
const password = require('../password');
const cTable = require('console.table');
const UI = require('../ulits/UI');
const inquirer = require('inquirer');


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
                ('${this.first_name}', '${this.last_name}', ${this.role_id}, ${this.manager_id});`)
            .catch(console.log)
            .then(() => con.end());

    }

    initiateEmployeeUpdate() {
        let employeeID;
        let roleID;
        let choiceData2;
        let nameData = [];
        let roleData = [];

        // RETURNS ROLES TO SELECT FROM 
        const con1 = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con1.promise().query(`
        SELECT id, title FROM role;
                `)
            .catch(console.log)
            .then(([rows, fields]) => {
                choiceData2 = rows.map(el => (el.id + ' ' +  el.title))
            })
            .then(() => con1.end());
        // RETURNS THE NAME OF THE EMPLOYEES 
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
        SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee;
                `)
            .catch(console.log)
            .then(([rows, fields]) => {
                const choiceData = rows.map(el => (el.id + ' ' +  el.name))

                inquirer.prompt([
                    {   // RETURNS THE NAMES OF THE EMPLOYEES IN A LIST 
                        type: 'list',
                        name: 'action',
                        message: 'Select an employee from the list below.',
                        choices: choiceData
                    },
                    {   // RETURNS THE ROLES IN A LIST
                        type: 'list',
                        name: 'action2',
                        message: 'Select a new Role from the list below.',
                        choices: choiceData2,
                        when: ({ action }) => action,
                    },
                    {
                        type: 'list',
                        name: 'home',
                        message: 'Return to Main Menu?',
                        choices: ['Yes', 'No'],
                        when: ({ action2 }) => action2,
                    }
                ]).then(({ action, action2, home }) => {
                    // GETS EMPLOYEE ID FOR USE IN THE QUERY
                    this.action = action
                    employeeID = this.action.split(' ', 1)

                    // STORES NAME AND ID TO DISPLAY LATER IN A MESSAGE
                    nameData.push(this.action)

                    // STORES THE ROLE ID FOR USE IN THE QUERY
                    this.action2 = action2
                    roleID = this.action2.split(' ', 1)

                    // STORES THE ROLE DESCRIPTION TO DISPLAY LATER IN A MESSAGE
                    roleData.push(this.action2)

                    this.home = home

                    // WHEN THE ROLE HAS BEEN SELECTED THE QUERY IS RUN TO UPDATE THE DATABASE
                    if (this.action2) {
                        // console.log (`The role for ${name} has been updated to ${this.action2}`)
                        const con2 = mysql.createConnection(
                            { host: 'localhost', user: 'root', password: password, database: 'employees' }
                        );

                        con2.promise().query(`
                        UPDATE employee SET role_id = ${roleID}
                        WHERE id = ${employeeID};
                                `)
                            .then(() => {
                                new UI().displaySingBreak();
                                console.log(`Success! Employee # ${nameData}'s Role was updated to role_id: ${roleData}`)
                            })
                            .catch(console.log)
                            .then(() => con2.end())
                    }
                    // WHEN FINISHED YOU CAN EDIT MORE EMPLOYEES OR RETURN TO MAIN 
                    if (this.home) {
                        if (this.home === 'Yes') {
                            const displayPrompt = require('./QuestionPrompt')
                            displayPrompt()
                        } else {
                            new Employees().initiateEmployeeUpdate();
                        }
                    }
                })
            })
            .then(() => con.end());
    }
}


//


module.exports = Employees;

//SQL to update employee
// UPDATE employee SET role_id = ${}
// WHERE id = ${};

//SQL to retrieve employees by name
// SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) as employee FROM employee LEFT JOIN employee as e on employee.id = e.id ;