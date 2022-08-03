-- Clearing datatables if exists
-- NOTE: the order of these table creation/drop is important and CANNOT be altered
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;



-- Department table creation
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT  PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);


-- role table creation
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,  
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Employee table Creation
CREATE TABLE employee (
     id INTEGER AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(30),
     last_name VARCHAR(30),
     role_id  INTEGER,
     manager_id INTEGER, 
     CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
     CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
); 