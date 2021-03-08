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
            // QUESTIONS FOR ADDING AN EMPLOYEE TO THE DATABASE
            {
                type: 'input',
                message: 'What is the FIRST name of the Employee you wish to add?',
                name: 'addEmployee',
                when: (data) => data.action2 === 'Add an Employee',
                validate: employeeInput => {
                    if (employeeInput) {
                        return true;
                    } else {
                        console.log('Please enter a FIRST name for the Employee you wish to add!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the LAST name of the Employee you wish to add?',
                name: 'lastName',
                when: ({ addEmployee }) => addEmployee,
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    } else {
                        console.log('Please enter a LAST name for the Employee you wish to add!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the ROLE ID of the Employee you wish to add?',
                name: 'roleID',
                when: ({ lastName }) => lastName,
                validate: roleIDInput => {
                    if (roleIDInput) {
                        return true;
                    } else {
                        console.log('Please enter a ROLE ID for the Employee you wish to add!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: "Enter the Employee ID of the Assigned Manager, If this Employee does not have a manager enter NULL",
                name: 'managerID',
                when: ({ roleID }) => roleID,
                validate: managerIDInput => {
                    if (managerIDInput) {
                        return true;
                    } else {
                        console.log('Please enter  the Managers ID or NULL!')
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'createEmployee',
                message: 'Would you like to add this employee to the database?',
                choices: ['Yes', 'No'],
                when: ({ managerID }) => managerID,
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
            
        ]).then(({ action, addDepartment, addEmployee, lastName, roleID, managerID, action2, action3, createEmployee}) => {
            this.action = action
            this.action2 = action2
            this.action3 = action3
            this.createEmployee = createEmployee

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
            if (this.action3 === 'Add a new role to database.') {
                console.log("You selected to Add a Role!");
                new Role().initiateRoleUpdate();
            } 
            if (this.action2 === "Update Employee Role") {
                console.log("You selected to Update an Employee's Role!");
                new Employees().initiateEmployeeUpdate()    
                // displayPrompt()                
            }            
            if (this.createEmployee === "Yes"){
                new Employees().addEmployee(addEmployee, lastName, roleID, managerID)
                new UI().displaySingBreak();
                console.log(`Success! ${addEmployee} ${lastName} was added to the database.`);
                new UI().displaySingBreak();
                displayPrompt()                
            }
            if (this.action === "Quit") {
                console.log("You selected to Quit!");
                return;
            }
        })

}

module.exports = displayPrompt;
