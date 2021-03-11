const questionPrompt = require('./lib/QuestionPrompt')
const fs = require('fs');
const instructions = require('./lib/instructionsData');
const path = require('path');
const mysql = require('mysql2');
const password = require('./password')
const inquirer = require('inquirer')


class App {
    constructor() {
        this.data = []
    }

    firstRun() {
        try {
            if (fs.existsSync('./instructions.txt')) {
                new App().initializeApp();

            } else {
                fs.writeFileSync(path.join(__dirname, './instructions.txt'), instructions);
                console.log(instructions);
                new App().initializeApp();
            }
        } catch (err) {
            console.error(err);
        }
    }

    initializeApp() {
        console.log(`
+--------------------------------------------------------------+
|                 WELCOME TO EMPLOYEE TRACKER                  |
+--------------------------------------------------------------+\n`)
        questionPrompt()
    }

    initializeDatabase() {

        const { spawn } = require('child_process');
        const child = spawn('mysql -u root -p', { shell: true, detached: true });

        child.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
        });

        child.stderr.on('data', (data) => {
            //console.error(`child stderr:\n${data}`);
        });
        child.on('exit', function (code, signal) {
            console.log('\n Success! Schema Accepted\n');
        });

    }

    viewInstructions() {
        console.log(`\n${instructions}`)
    }

    loadInstructions() {
        const { spawn } = require('child_process');
        const child1 = spawn(`code instructions.txt`, { shell: true, detached: true });

        child1.stdout.on('data', (data) => {
            console.log(`child1 stdout:\n${data}`);
        });

        child1.stderr.on('data', (data) => {
            console.error(`child1 stderr:\n${data}`);
        });
        child1.on('exit', function (code, signal) {

            questionPrompt();

        });
    }
    viewBudget() {
        console.log(`\nYou selected to view the budget!\n`)
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query("SELECT SUM(salary) AS 'Salary Totals' FROM role, employee WHERE employee.role_id=role.id;")
            .then(([rows, fields]) => {
                console.log(`\n`)
                console.table(rows);
                console.log(`\n`)
            })
            .catch(console.log)
            .then(() => con.end());
        questionPrompt();
    }

    viewBudgetDepartment() {
        console.log(`\nYou selected to view departmental budget`)
        const con = mysql.createConnection(
            { host: 'localhost', user: 'root', password: password, database: 'employees' }
        );
        con.promise().query("SELECT * FROM departments;")
            .then(([rows, fields]) => {
                const choiceData = rows.map(el => (el.id + ' ' + el.department_name))

                if (choiceData === undefined) {
                    new Departments().deleteDepartmentInit()
                } else {
                    inquirer.prompt([
                        {   // RETURNS THE NAMES OF THE Departments IN A LIST 
                            type: 'list',
                            name: 'selectDepartment',
                            message: 'Select the department you wish to view:',
                            choices: choiceData,
                        },
                    ])
                        .then(({ selectDepartment }) => {
                            let departmentID = selectDepartment.split(' ', 1)
                            // new Departments().deleteDepartment(departmentID,selectDepartment)
                            const con1 = mysql.createConnection(
                                { host: 'localhost', user: 'root', password: password, database: 'employees' }
                            );
                            con1.promise().query(`SELECT SUM(salary) AS 'Total Departmental Budget'
                            FROM employee
                            LEFT JOIN role ON employee.role_id=role.id
                            WHERE role.department_id = ${departmentID};`)
                                .then(([rows, fields]) => {
                                    console.log(`\n`)
                                    console.table(rows);
                                    console.log(`\n`)

                                    questionPrompt();
                                })
                                .catch(console.log)
                                .then(() => con1.end());
                        })
                }
            })
            .catch(console.log)
            .then(() => con.end());
    }


}
module.exports = App;
