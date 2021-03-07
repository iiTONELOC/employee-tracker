DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
    
)ENGINE=INNODB;

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department
    FOREIGN KEY(department_id)
        REFERENCES departments(id)
            ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id)
        REFERENCES employee(id)
            ON DELETE SET NULL,
    FOREIGN KEY (role_id)
        REFERENCES role(id)
            ON UPDATE CASCADE
            ON DELETE CASCADE

)ENGINE=INNODB;

