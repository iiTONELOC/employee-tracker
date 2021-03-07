const inquirer = require('inquirer');

class App {
    constructor() {
        this.data = []
    }
    initializeApp() {
        console.log(`WELCOME TO EMPLOYEE TRACKER`)
        this.questionPrompt();

    }
    questionPrompt() {
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
            ])
            .then(({ action }) => {
                this.action = action
                if (this.action === 'View All Departments') {
                    console.log("You selected to view all Departments!");
                    this.questionPrompt();
                }
                if (this.action === 'View All Roles') {
                    console.log("You selected to View All Roles!");
                    this.questionPrompt();
                }
                if (this.action === 'View All Employees') {
                    console.log("You selected to View All Employees!");
                    this.questionPrompt();
                }
                if (this.action === 'Add a Department') {
                    console.log("You selected to Add a Department!");
                    this.questionPrompt();
                }
                if (this.action === 'Add a Role') {
                    console.log("You selected to Add a Role!");
                    this.questionPrompt();
                }
                if (this.action === 'Add an Employee') {
                    console.log("You selected to Add an Employee!");
                    this.questionPrompt();
                }
                if (this.action === "Update an Employee's Role") {
                    console.log("You selected to Update an Employee's Role!");
                    this.questionPrompt();
                }
                if (this.action === "Quit") {
                    console.log("You selected to Quit!");
                    return;
                }
            })
    }
}

module.exports = App;