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
('Jack', 'London', 2, 1);
-- ('Andy', 'Louis', 3, 2),
-- ('Mary', 'McDowell', 5, NULL),
-- ('Peter', 'Arnold', 10, NULL),
-- ('Hugh', 'Jorgin', 11, 5),
-- ('Jennifer', 'Smith', 14, NULL),
-- ('Billy', 'Jones', 13, 7),
-- ('Alicia', 'DiPietro', 23, NULL),
-- ('Hector', 'Fielderman', 24, 9),
-- ('Margaret', 'Bronsen', 25, 9),
-- ('Luis', 'London', 4, 1),
-- ('Edward', 'Pinkerton', 20, 14),
-- ('Alex', 'McCarthy', 19, NULL);



