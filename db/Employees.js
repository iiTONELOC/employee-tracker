// get the client
const mysql = require('mysql2');
const password = require('../password');
const cTable = require('console.table');
const UI = require('../ulits/UI');

const viewEmployees = () => {
    // create the connection
    const con = mysql.createConnection(
        { host: 'localhost', user: 'root', password: password, database: 'employees' }
    );
    con.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.department_name as department, role.salary, CONCAT(e.first_name, " ", e.last_name) as manager
    FROM employee
    inner join role ON (employee.role_id = role.id)
    inner join departments on role.department_id = departments.id
    left join employee as e on employee.manager_id = e.id;`)
        .then(([rows, fields]) => {
            new UI().displaySingBreak()
            console.table(rows);
            new UI().displayDblBreak()            
        })
        .catch(console.log)
        .then(() => con.end());
}

module.exports = viewEmployees;