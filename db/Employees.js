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
        inner join departments ON (role.department_id = departments.id)
        left join employee as e ON (employee.manager_id = e.id);`)
            .then(([rows, fields]) => {
                new UI().displaySingBreak()
                console.table(rows);
                new UI().displayDblBreak()
            })
            .catch(console.log)
            .then(() => con.end());
    }

    addEmployee(first_name, last_name, role_id, manager_id) {
        
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                Values
                ('${first_name}', '${last_name}', ${role_id}, ${manager_id});`)
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
                choiceData2 = rows.map(el => (el.id + ' ' + el.title))
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
                const choiceData = rows.map(el => (el.id + ' ' + el.name))

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
                    employeeID = action.split(' ', 1)
                    // STORES NAME AND ID TO DISPLAY LATER IN A MESSAGE
                    nameData.push(action)
                    // STORES THE ROLE ID FOR USE IN THE QUERY
                    roleID = action2.split(' ', 1)
                    // STORES THE ROLE DESCRIPTION TO DISPLAY LATER IN A MESSAGE
                    roleData.push(action2)
                    // WHEN THE ROLE HAS BEEN SELECTED THE QUERY IS RUN TO UPDATE THE DATABASE
                    if (action2) {
                        // console.log (`The role for ${name} has been updated to ${action2}`)
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
                    if (home) {
                        if (home === 'Yes') {
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

    initiateEmployeeAdd() {
        new UI().displaySingBreak();
        console.log("You selected to Add an Employee to the database!");

        //need list of roles, capture role id 
        // RETURNS ROLES TO SELECT FROM 
        let managerID;
        let roleID;
        let choiceData3;

        // RETURNS ROLES TO SELECT FROM 
        const con1 = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con1.promise().query(`
        SELECT id, title FROM role;
                `)
            .catch(console.log)
            .then(([rows, fields]) => {
                choiceData3 = rows.map(el => (el.id + ' ' + el.title))
                return choiceData3;

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
                const choiceData = rows.map(el => (el.id + ' ' + el.name))

                inquirer.prompt([
                    {   // EMPLOYEE FIRST NAME
                        type: 'input',
                        message: 'What is the FIRST name of the Employee you wish to add?',
                        name: 'firstName',
                        validate: employeeInput => {
                            if (employeeInput) {
                                return true;
                            } else {
                                console.log('Please enter a FIRST name for the Employee you wish to add!')
                                return false;
                            }
                        }
                    },
                    {   // EMPLOYEE LAST NAME
                        type: 'input',
                        message: 'What is the LAST name of the Employee you wish to add?',
                        name: 'lastName',
                        when: ({ firstName }) => firstName,
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please enter a LAST name for the Employee you wish to add!')
                                return false;
                            }
                        }
                    },
                    {   // RETURNS THE ROLES IN A LIST
                        type: 'list',
                        name: 'role',
                        message: 'Select a Role for the new Employee from the list below.',
                        choices: choiceData3,
                        when: ({ lastName }) => lastName,
                    },
                    {
                        type: 'confirm',
                        name: 'confirmAddManager',
                        message: 'Would you like to enter a manager for this employee?',
                        default: false,
                        when: ({ role }) => role,
                    },
                    {   // RETURNS THE NAMES OF THE EMPLOYEES IN A LIST 
                        type: 'list',
                        name: 'manager',
                        message: 'Select an employee from the list below.',
                        choices: choiceData,
                        when: ({ confirmAddManager }) => confirmAddManager,
                    },
                    {
                        type: 'list',
                        name: 'home',
                        message: 'Would you like to add another employee?',
                        choices: ['Yes', 'No'],

                    }
                ]).then(({ firstName, lastName, role, manager, confirmAddManager, home }) => {
                    if (confirmAddManager === false) {
                        managerID = 'NULL'
                    } else {
                        manager = manager
                        managerID = manager.split(' ', 1)
                    }
                    roleID = role.split(' ', 1)

                    if (home === 'Yes') {
                        new Employees().addEmployee(firstName, lastName, roleID, managerID)
                        new UI().displaySingBreak();
                        console.log(`Success!`)
                        new Employees().initiateEmployeeAdd()
                    } else {
                        new Employees().addEmployee(firstName, lastName, roleID, managerID)
                        new UI().displaySingBreak();
                        console.log(`Success!`)
                        new Employees().initiateEmployeeAdd()
                        const displayPrompt = require('./QuestionPrompt')
                        displayPrompt();
                    }
                })
            })
            .then(() => con.end());
    }
}

module.exports = Employees;

//SQL to update employee
// UPDATE employee SET role_id = ${}
// WHERE id = ${};

//SQL to retrieve employees by name
// SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) as employee FROM employee LEFT JOIN employee as e on employee.id = e.id ;
