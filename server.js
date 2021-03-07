// SQL for returning the departments table
// SELECT * FROM departments;

// SQL for returning the roles
// SELECT * FROM role;

// SQL for returning id name title and salary
// SELECT a.id, a.first_name, a.last_name, b.title, b.salary
// FROM employee a LEFT JOIN role b
// ON a.role_id = b.id;

// SQL for returning id name title department salary manager
// SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.department_name as department, role.salary, CONCAT(e.first_name, " ", e.last_name) as manager
//   FROM employee
//   inner join role ON (employee.role_id = role.id)
//   inner join departments on role.department_id = departments.id
//   left join employee as e on employee.manager_id = e.id;