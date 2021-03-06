DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);