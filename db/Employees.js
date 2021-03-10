// get the client
const mysql = require('mysql2');
const password = process.env.PASSWORD;
const cTable = require('console.table');
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
        INNER JOIN role ON (employee.role_id = role.id)
        INNER JOIN departments ON (role.department_id = departments.id)
        LEFT JOIN employee AS e ON (employee.manager_id = e.id);`)
            .then(([rows, fields]) => {
                console.log(`\n`)
                console.table(rows);
                console.log(`\n\n`)
            })
            .catch(console.log)
            .then(() => con.end());
    }

    viewEmployeesBy(data) {
        // create the connection
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`SELECT DISTINCT employee.id, employee.first_name, employee.last_name, role.title, departments.department_name as department, role.salary, CONCAT(e.first_name, " ", e.last_name) as manager
        FROM employee 
        INNER JOIN role ON (employee.role_id = role.id) 
        INNER JOIN departments ON (role.department_id = departments.id)
        LEFT JOIN employee AS e ON (employee.manager_id = e.id ) ORDER BY ${data};`)
            .then(([rows, fields]) => {
                console.log(`\n`)
                console.table(rows);
                console.log(`\n\n`)
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
    updateEmployeeManager(manager, employee) {

        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
        UPDATE employee SET manager_id = ${manager} WHERE id = ${employee};`)
            .catch(console.log).then(console.log(`\nEmployee was successfully updated!`))
            .then(() => con.end());
    }

    deleteEmployee(employeeID) {
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
                DELETE FROM employee WHERE id = ${employeeID};`)
            .catch(console.log)
            .then(() => con.end());
    }

    initiateUpdateEmployeeManager() {

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
                let choiceData1 = [...choiceData]
                choiceData1.push('NULL')

                inquirer.prompt([
                    {   // RETURNS THE NAMES OF THE EMPLOYEES IN A LIST 
                        type: 'list',
                        name: 'selectEmployee',
                        message: 'Select an employee you wish to update from the list below.',
                        choices: choiceData,
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Assign a manager from the list below. If you want to remove a manager select `NULL`',
                        choices: choiceData1,
                        when: ({ selectEmployee }) => selectEmployee,
                    },
                    {
                        type: 'list',
                        name: 'home',
                        message: '\nWould you like to update another employee?',
                        choices: ['Yes', 'No'],
                    }
                ])
            })
            .then(() => con.end());

    }

    initiateEmployeeDelete(choiceData) {
        choiceData

        console.log(`\nYou selected to delete an employee!`)
        // RETURNS THE NAME OF THE EMPLOYEES 
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query(`
        SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee;
                `)
            .catch(console.log)
            .then(([rows, fields]) => {
                let choiceData = rows.map(el => (el.id + ' ' + el.name))

                inquirer.prompt([
                    {   // RETURNS THE NAMES OF THE EMPLOYEES IN A LIST 
                        type: 'list',
                        name: 'selectEmployee',
                        message: 'Select an employee you wish to delete from the list below.',
                        choices: choiceData,
                    },
                    {
                        type: 'list',
                        name: 'home',
                        message: '\nWould you like to delete another employee?',
                        choices: ['Yes', 'No'],
                    }
                ]).then(({ selectEmployee, home }) => {
                    let employeeID = selectEmployee.split(' ', 1)
                    let choiceDataRerun = choiceData.filter(el => el != selectEmployee)
                    if (selectEmployee) {
                        new Employees().deleteEmployee(employeeID)
                    }
                    if (home === 'Yes') {
                        console.log(`\nSuccess! \n${selectEmployee} has been deleted!`)
                        choiceDataRerun = choiceData
                        return new Employees().initiateEmployeeDelete(choiceData)
                    } if (home === 'No') {
                        console.log(`\nSuccess! \n${selectEmployee}s been deleted!`)
                        const displayPrompt = require('../lib/QuestionPrompt')
                        displayPrompt();
                    }
                })
            })
            .then(() => con.end());
    }

    initiateEmployeeUpdate() {
        let employeeID;
        let roleID;
        let choiceData3;
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
                const choiceData2 = rows.map(el => (el.id + ' ' + el.title))
                choiceData3 = [...choiceData2]
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

                //SOMETIMES QUERY IS RETURNING UNDEFINED IF SO RUN AGAIN
                if (choiceData3 === undefined) {
                    new Employees().initiateEmployeeUpdate()
                } else {
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
                            choices: choiceData3,
                            when: ({ action }) => action,

                        },
                        {
                            type: 'list',
                            name: 'home',
                            message: '\nWould you like to update another employee?',
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

                            const con2 = mysql.createConnection(
                                { host: 'localhost', user: 'root', password: password, database: 'employees' }
                            );
                            con2.promise().query(`
                            UPDATE employee SET role_id = ${roleID}
                            WHERE id = ${employeeID};
                                    `)
                                .then(() => {
                                    console.log(`\nSuccess! \nEmployee # ${nameData}'s role has been updated to role_id: ${roleData}`)
                                })
                                .catch(console.log)
                                .then(() => con2.end())
                        }
                        // WHEN FINISHED YOU CAN EDIT MORE EMPLOYEES OR RETURN TO MAIN 
                        if (home) {

                            if (home === 'No') {
                                console.log(`\n`);
                                const displayPrompt = require('../lib/QuestionPrompt')
                                displayPrompt()
                            }
                            if (home === 'Yes') {
                                return new Employees().initiateEmployeeUpdate();
                            }
                        }
                    })
                }
            })
            .then(() => con.end());
    }

    initiateEmployeeAdd() {
        console.log("\nYou selected to Add an Employee to the database!");

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

            })
            .then(() => con1.end());
        // RETURNS THE NAME OF THE EMPLOYEES 
        const con8 = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con8.promise().query(`
        SELECT id, CONCAT(first_name, ' ', last_name) as name FROM employee;
                `)
            .catch(console.log)
            .then(([rows, fields]) => {
                const choiceData = rows.map(el => (el.id + ' ' + el.name))
                if (choiceData3 === undefined) {
                    console.log(`\nAn unknown error has occurred.\nTrying your request again.`)
                    return new Employees().initiateEmployeeAdd()
                } else {
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
                            managerID = manager.split(' ', 1)
                        }
                        roleID = role.split(' ', 1)

                        if (home === 'Yes') {
                            new Employees().addEmployee(firstName, lastName, roleID, managerID)
                            console.log(`\nSuccess! \n${firstName} ${lastName} has been added to the database!`)
                            return new Employees().initiateEmployeeAdd()
                        } else {
                            new Employees().addEmployee(firstName, lastName, roleID, managerID)
                            console.log(`\nSuccess! \n${firstName} ${lastName} has been added to the database!\n`)
                            const displayPrompt = require('../lib/QuestionPrompt')
                            return displayPrompt();
                        }
                    })
                }
            })
            .then(() => con8.end());
    }
}

module.exports = Employees;
