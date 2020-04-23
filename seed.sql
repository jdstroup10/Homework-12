SELECT * FROM employee_db.employee;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Dean", "Romero", 13, 21),
("Sara", "Scheinder", 6, 4),
("Rebecca", "Smith", 9, 5),
("Robert", "Smith", 3, 1),
("Brian", "Jackson", 5, 5);

INSERT INTO role (title, salary, manager_id)
VALUES
("janitor", 38000, 22),
("Manager", 60000, 21),
("Engineer", 70000, 4),
("Engineer", "65000", 5),
("Sales", "50000", 1),
("Intern", "0", 5);

INSERT INTO department (name)
VALUES
("Janitorial Services"),
("Management"),
("Engineering Team"),
("Engineering Team"),
("Marketing and Sales"),
("Student Opportunities Dept");