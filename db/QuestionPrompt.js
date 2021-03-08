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
                    "Update an Employee",
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
            // QUESTIONS FOR ADDING A ROLE TO THE DATABASE
            {
                type: 'input',
                message: 'What is the name of the Role you wish to add?',
                name: 'addRole',
                when: (data) => data.action === 'Add a Role',
                validate: roleInput => {
                    if (roleInput) {
                        return true;

                    } else {
                        console.log('Please enter a name for the Role you wish to add!')
                        return false;
                    }
                }
            },
            {
                type: 'input',
                message: 'What is the Salary for this position?',
                name: 'roleSalary',
                when: ({ addRole }) => addRole,
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
                type: 'input',
                message: 'Enter the corresponding Department ID #?',
                name: 'roleDepartment',
                when: ({ roleSalary }) => roleSalary,
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;

                    } else {
                        console.log('Please enter a Department ID for the Role you wish to add!')
                        return false;
                    }
                }
            },
            // QUESTIONS FOR ADDING AN EMPLOYEE TO THE DATABASE
            {
                type: 'input',
                message: 'What is the FIRST name of the Employee you wish to add?',
                name: 'addEmployee',
                when: (data) => data.action === 'Add an Employee',
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
            // UPDATING EMPLOYEE RECORDS
            {
                type: 'list',
                name: 'action2',
                message: 'Select an option for updating your employee',
                choices: [
                    'Update Employee Role',
                ],
                when: (data) => data.action === 'Update an Employee',
            },

        ]).then(({ action, addDepartment, addRole, roleSalary, roleDepartment, addEmployee, lastName, roleID, managerID, action2 }) => {
            this.action = action
            this.action2 = action2
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
            if (this.action === 'Add a Role') {
                new Role().addRole(addRole, roleSalary, roleDepartment)
                console.log("You selected to Add a Role!");

                displayPrompt()
            }
            if (this.action === 'Add an Employee') {
                new Employees().addEmployee(addEmployee, lastName, roleID, managerID)
                console.log("You selected to Add an Employee!");
                displayPrompt()
            }
            if (this.action === "Update an Employee") {
                if (this.action2 === "Update Employee Role"){
                    new Employees().initiateEmployeeUpdate()
                    console.log("You selected to Update an Employee's Role!");
                    // displayPrompt()
                }
        
            }
            if (this.action === "Quit") {
                console.log("You selected to Quit!");
                return;
            }
        })

}

module.exports = displayPrompt;
