USE employee_tracker;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
id INTEGER  NOT Null auto_increment PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
 id INTEGER NOT NULL auto_increment PRIMARY KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,
 FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
id INTEGER NOT NULL auto_increment PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES role(id)
);


