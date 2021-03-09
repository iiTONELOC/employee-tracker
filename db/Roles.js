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
                    // get the department id
                    deptID = department.split(' ', 1)
                    if (roleSalary) {
                        new Role().addRole(role, roleSalary, deptID)
                    }
                    if (home) {
                        if (home === 'Yes') {
                            new UI().displaySingBreak()
                            console.log(`Success! The role: ${role} has been added to the database!`)
                            const displayPrompt = require('./QuestionPrompt')
                            displayPrompt()
                        } else {
                            new UI().displaySingBreak()
                            console.log(`Success! The role: ${role} has been added to the database!`)
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
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                INSERT INTO role (title, salary, department_id)
                Values
                ('${title}', ${salary}, ${department});
                `)
            .catch(console.log)
            .then(() => con.end());

    }
    deleteRole(data, role){
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                DELETE FROM role WHERE id = ${data}`).then(() => {
            console.log(`Success!\n${role} was removed from the database!`);
            const displayPrompt = require('./QuestionPrompt')
            displayPrompt();
        })
            .catch(console.log)
            .then(() => con.end());
    }

    deleteRoleInit(){
        console.log(`You selected to delete a role from the database!`)
        // create the connection
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query("SELECT * FROM role;")
            .then(([rows, fields]) => {
                const choiceData = rows.map(el => (el.id + ' ' + el.title))

                    inquirer.prompt([
                        {   // RETURNS THE NAMES OF THE Departments IN A LIST 
                            type: 'list',
                            name: 'selectRole',
                            message: 'Select the role you wish to delete',
                            choices: choiceData,
                        },
                    ])
                        .then(({ selectRole }) => {
                            let roleID = selectRole.split(' ', 1)
                            new Role().deleteRole(roleID,selectRole)
                        })
                
            })
    }
}


module.exports = Role;

