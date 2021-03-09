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
                    '___________________',
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    '___________________',
                    'View Options for Departments',
                    'View Options for Roles',
                    'View Options for Employees',
                    '___________________',
                    'Quit',

                ]
            },
            // Question for adding a department
            {
                type: 'list',
                name: 'action2',
                message: 'Select an option for updating Departments',
                choices: [
                    'Add a Department',
                    "Delete Department"
                ],
                when: (data) => data.action === 'View Options for Departments',
            },
            {
                type: 'input',
                message: 'What is the name of the department you wish to add?',
                name: 'addDepartment',
                when: (data) => data.action2 === 'Add a Department',
                validate: depInput => {
                    if (depInput) {
                        return true;
                    } else {
                        console.log('Please enter a name for the Department you wish to add!')
                        return false;
                    }
                }
            },
            {   // CONFIRM DELETE
                type: 'list',
                name: 'deleteDepartment',
                message: 'Are you sure? This action can not be undone!',
                choices: ['Yes', 'No'],
                when: (data) => data.action2 === 'Delete Department',
            },
            // UPDATING EMPLOYEE RECORDS
            {
                type: 'list',
                name: 'action3',
                message: 'Select an option for updating your employee',
                choices: [
                    'Add an Employee',
                    'Update Employee Role',
                    "Update Employee's Manager",
                    "Delete Employee"
                ],
                when: (data) => data.action === 'View Options for Employees',
            },
            {   // CONFIRM DELETE
                type: 'list',
                name: 'deleteEmployee',
                message: 'Are you sure? This action can not be undone!',
                choices: ['Yes', 'No'],
                when: (data) => data.action3 === 'Delete Employee',
            },

            // OPTIONS FOR ROLE TABLE
            {
                type: 'list',
                name: 'action4',
                message: 'Select an option for updating Roles',
                choices: [
                    'Add a new role to database.',
                    'Delete a role from database'
                ],
                when: (data) => data.action === 'View Options for Roles',
            },
            {   // CONFIRM DELETE
                type: 'list',
                name: 'deleteRole',
                message: '\nAre you sure? This action can NOT be undone!',
                choices: ['Yes', 'No'],
                when: (data) => data.action4 === 'Delete a role from database',
            },

        ]).then(({ action, action2, action3, action4, addDepartment, deleteEmployee, deleteRole, deleteDepartment }) => {
            if (action === '___________________') {
                displayPrompt();
            }
            if (action === 'View All Departments') {
                new Departments().viewDepartments();
                displayPrompt();
            }
            if (action === 'View All Roles') {
                new Role().viewRole();
                displayPrompt()
            }
            if (action === 'View All Employees') {
                new Employees().viewEmployees();
                displayPrompt()
            }
            if (action2 === 'Add a Department') {
                new Departments().addDepartment(addDepartment);
            }
            if (deleteDepartment === 'Yes') {
                new Departments().deleteDepartmentInit();
            }
            if(deleteDepartment === 'No'){
                displayPrompt();
            }
            if (action3 === "Add an Employee") {
                new Employees().initiateEmployeeAdd()
            }
            if (action3 === "Update Employee Role") {
                console.log("You selected to Update an Employee's Role!");
                new Employees().initiateEmployeeUpdate()
            }
            if (action3 === "Update Employee's Manager") {
                new Employees().initiateUpdateEmployeeManager()
            }
            if (deleteEmployee === 'Yes') {
                new Employees().initiateEmployeeDelete()
            }
            if (deleteEmployee === 'No') {
                displayPrompt()
            }
            if (action4 === 'Add a new role to database.') {
                console.log("You selected to Add a Role!");
                new Role().initiateRoleUpdate();
            }
            if (deleteRole === 'Yes') {
                new Role().deleteRoleInit();
            }
            if (deleteRole === 'No') {
                displayPrompt()
            }
            if (action === "Quit") {
                console.log(`\nYou selected to Quit! \nGood Bye!`);
                return;
            }
        })

}

module.exports = displayPrompt;
