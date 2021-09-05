INSERT into department (name) VALUES ('Accounting');
INSERT into department (name) VALUES ('Operattion');
INSERT into department (name) VALUES ('Teaching Staff');
INSERT into department (name) VALUES ('Sales');
INSERT into department (name) VALUES ('Human Resources');
INSERT into department (name) VALUES ('Back Office');
INSERT into department (name) VALUES ('Front Office');
INSERT into department (name) VALUES ('Back Office');


INSERT into role (title, salary, department_id) VALUES ('Manager', 165000, 5);
INSERT into role (title, salary, department_id) VALUES ('Intern', 55000, 3);
INSERT into role (title, salary, department_id) VALUES ('Sales', 155000, 2);
INSERT into role (title, salary, department_id) VALUES ('Software Engineer', 85000, 1);
INSERT into role (title, salary, department_id) VALUES ('Lawyer', 125000, 4);
INSERT into role (title, salary, department_id) VALUES ('Teacher', 100000, 6);
INSERT into role (title, salary, department_id) VALUES ('Dog Walker',185000, 7);
INSERT into role (title, salary, department_id) VALUES ('Secertary', 105000, 8);
 
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES('Denise', 'Tuominen', 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES('Gunnar', 'Tuominen', 8, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES('Megan', 'Londo', 5, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Jordan', 'Tollefson', 7, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Scott', 'Tollefson', 6, 2);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES  ('Ryan', 'Londo', 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Matti', 'Londo', 2, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES  ('Mike', 'Tuominen', 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ('Gus', 'Tollefson', 7, null);