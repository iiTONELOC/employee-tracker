const inquirer = require('inquirer');
const Departments = require('./Departments');
const Role = require('./Roles');
const Employees = require('./Employees');
const UI = require('../ulits/UI');

function displayPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'View Options for Roles',
                    'View Options for Employees',
                    'Quit'
                ]
            },
            // Question for adding a department
            {
                type: 'input',
                message: 'What is the name of the department you wish to add?',
                name: 'addDepartment',
                when: (data) => data.action === 'Add a Department',
                validate: depInput => {
                    if (depInput) {
                        return true;
                    } else {
                        console.log('Please enter a name for the Department you wish to add!')
                        return false;
                    }
                }
            },
            // UPDATING EMPLOYEE RECORDS
            {
                type: 'list',
                name: 'action2',
                message: 'Select an option for updating your employee',
                choices: [
                    'Add an Employee',
                    'Update Employee Role',
                ],
                when: (data) => data.action === 'View Options for Employees',
            },
            
            // OPTIONS FOR ROLE TABLE
            {
                type: 'list',
                name: 'action3',
                message: 'Select an option for updating Roles',
                choices: [
                    'Add a new role to database.',
                ],
                when: (data) => data.action === 'View Options for Roles',
            },
            
        ]).then(({ action, addDepartment, action2, action3 }) => {
            this.action = action
            this.action2 = action2
            this.action3 = action3
        

            if (this.action === 'View All Departments') {
                new Departments().viewDepartments();
                displayPrompt();
            }
            if (this.action === 'View All Roles') {
                new Role().viewRole();
                displayPrompt()
            }
            if (this.action === 'View All Employees') {
                new Employees().viewEmployees();
                displayPrompt()
            }
            if (this.action === 'Add a Department') {
                new Departments().addDepartment(addDepartment)
                displayPrompt()
            }
            if (this.action2 === "Add an Employee"){
                new Employees().initiateEmployeeAdd()
            }
            if (this.action2 === "Update Employee Role") {
                console.log("You selected to Update an Employee's Role!");
                new Employees().initiateEmployeeUpdate()               
            }            
            if (this.action3 === 'Add a new role to database.') {
                console.log("You selected to Add a Role!");
                new Role().initiateRoleUpdate();
            } 
            
            
            if (this.action === "Quit") {
                console.log("You selected to Quit!");
                return;
            }
        })

}

module.exports = displayPrompt;
