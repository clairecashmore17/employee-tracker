-- Populate Departments
INSERT INTO department (dep_name)
VALUES
('Management'),
('Graphic Design'),
('Sales Department');

-- Populate Roles
INSERT INTO roles (title, salary, department_id)
VALUES
('Lead Manager', 60000, 1),
('Sub Manager', 45000,1),
('Lead Designer', 60000, 2),
('Designer', 40000, 2),
('Intern Designer', 0 , 2),
('Clerk', 35000,3),
('Commercial Guy', 55000, 3);

-- Populate Employees
INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES
('John','Doe', 1, 1),
('Mary','Joe', 3,1),
('Bob', 'Smith', 2, 3),
('Liz', 'Gillies', 2,3),
('Nick', 'Jonas', 2,3),
('Dave', 'Biggons', 3, 1),
('Jackson', 'Jamison', 2,3),
('Claire', 'Irvine', 3, 1),
('Emma', 'Irvine', 2, 3);

