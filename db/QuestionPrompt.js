const inquirer = require('inquirer');
const Departments = require('./Departments');
const Role = require('./Roles');
const Employees = require('./Employees');

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
                'Add a Role',
                'Add an Employee',
                "Update an Employee's Role",
                'Quit'
            ]

        }
    ]).then(({ action }) => {
        this.action = action 
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
            new Departments().addDepartment()
            displayPrompt()
        }
        if (this.action === 'Add a Role') {
            console.log("You selected to Add a Role!");
            displayPrompt()
        }
        if (this.action === 'Add an Employee') {
            console.log("You selected to Add an Employee!");
            displayPrompt()
        }
        if (this.action === "Update an Employee's Role") {
            console.log("You selected to Update an Employee's Role!");
            displayPrompt()
        }
        if (this.action === "Quit") {
            console.log("You selected to Quit!");
            return;
        }
    })

}

module.exports = displayPrompt;
