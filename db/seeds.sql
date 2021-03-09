INSERT INTO departments (department_name)
VALUES
('Accounting'),
('Legal'),
('Engineering'),
('R&D'),
('Marketing'),
('Sales'),
('Facilities'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('Finance Director', 195000, 1),
('Assistant Finance Director', 159000, 1),
('Accountant', 61000, 1),
('Account Assistant', 42750, 1),
('Lawyer', 94575, 2),
('Paralegal', 43000, 2),
('Engineering Director', 165000, 3),
('Project Leader', 88000,  3),
('Engineer', 72750, 3),
('Director of R&D', 189258, 4),
('R&D Scientist', 91587, 4),
('R&D Technician', 43654, 4),
('Brand Planner', 44000, 5),
('Marketing Operations Manager', 185000, 5),
('Marketing Specialist', 55000, 5),
('Business Development Director', 125000, 6),
('Account Manager', 95000, 6),
('Account Services', 45000, 6),
('Maintenance Director', 110000, 7),
('Maitenance Technican', 52000, 7),
('Maintenance Helper', 34500, 7),
('Director of IT', 165000, 8),
('Network Operations Manager', 120000, 8),
('Tech Support Technician', 50000, 8),
("Help Desk", 36000, 8);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('James', 'Fraser', 1, NULL),
('Jack', 'London', 3, 1),
('Andy', 'Louis', 1, NULL),
('Mary', 'McDowell', 3, 1),
('Peter', 'Arnold', 1, NULL),
('Hugh', 'Jorgin', 3, 1),
('Jennifer', 'Smith', 1, NULL),
('Billy', 'Jones', 3, 1),
('Alicia', 'DiPietro', 1, NULL),
('Hector', 'Fielderman', 3, 1),
('Margaret', 'Bronsen', 1, NULL),
('Luis', 'London', 3, 1),
('Edward', 'Pinkerton', 1, NULL),
('Alex', 'McCarthy', 3, 1);



