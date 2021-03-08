// get the client
const mysql = require('mysql2');
const password = require('../password');
const cTable = require('console.table');
const UI = require('../ulits/UI');
const inquirer = require('inquirer');

class Role {
    constructor() {
        this.data = [];
    }

    initiateRoleUpdate() {
        let deptID;
        // RETURNS Choices for departments

        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query("SELECT id, department_name FROM departments;")
            .then(([rows, fields]) => {
                //Maps the array
                const choice = rows.map(el => (el.id + ' ' + el.department_name))
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the name of the Role you wish to add? Select an option',
                        name: 'role',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;

                            } else {
                                console.log('Please enter a name for the Role you wish to add!')
                                return false;
                            }
                        }
                    },
                    {   // RETURNS THE DEPARTMENTS IN A LIST
                        type: 'list',
                        name: 'department',
                        message: 'Select the department this role is tied to from the list below.',
                        choices: choice,
                        when: ({ role }) => role,
                    },
                    {
                        type: 'input',
                        message: 'What is the Salary for this position?',
                        name: 'roleSalary',
                        when: ({ department }) => department,
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;

                            } else {
                                console.log('Please enter a Salary for the Role you wish to add!')
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'home',
                        message: 'Return to Main Menu?',
                        choices: ['Yes', 'No'],
                        when: ({ roleSalary }) => roleSalary,

                    },

                ]).then(({ role, department, roleSalary, home }) => {
                    this.home = home
                    this.role = role
                    this.department = department
                    // get the department id
                    deptID = this.department.split(' ', 1)
                    this.roleSalary = roleSalary

                    if (this.roleSalary) {
                        new Role().addRole(this.role, this.roleSalary, deptID)
                    }
                    if (this.home) {
                        if (this.home === 'Yes') {
                            new UI().displaySingBreak()
                            console.log(`Success! The role: ${this.role} has been added to the database!`)
                            const displayPrompt = require('./QuestionPrompt')
                            console.log(`Success! The role: ${this.role} has been added to the database!`)
                            displayPrompt()
                        } else {
                            new UI().displaySingBreak()
                            console.log(`Success! The role: ${this.role} has been added to the database!`)
                            new UI().displaySingBreak()
                            new Role().initiateRoleUpdate();
                        }
                    }
                })

            })
            .catch(console.log)
            .then(() => con.end())
    }

    viewRole() {
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

