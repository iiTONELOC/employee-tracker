const inquirer = require('inquirer');
const Departments = require('./Departments');
const viewRole = require('./Roles');
const viewEmployees = require('./Employees');

async function displayPrompt() {
    const answers = await inquirer.prompt([
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
    ])
    if (answers.action === 'View All Departments') {
        new Departments().viewDepartments();
        displayPrompt();

    }
    if (answers.action === 'View All Roles') {
        viewRole();

        displayPrompt()
    }
    if (answers.action === 'View All Employees') {
        viewEmployees();

        displayPrompt()
    }
    if (answers.action === 'Add a Department') {
        console.log("You selected to Add a Department!");
        displayPrompt()
    }
    if (answers.action === 'Add a Role') {
        console.log("You selected to Add a Role!");
        displayPrompt()
    }
    if (answers.action === 'Add an Employee') {
        console.log("You selected to Add an Employee!");
        displayPrompt()
    }
    if (answers.action === "Update an Employee's Role") {
        console.log("You selected to Update an Employee's Role!");
        displayPrompt()
    }
    if (answers.action === "Quit") {
        console.log("You selected to Quit!");
        return;
    }
}

module.exports = displayPrompt;
