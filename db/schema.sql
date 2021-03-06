DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS role;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL REFERENCES departments(id)
);