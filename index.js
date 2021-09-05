const { getTable } = require("console.table");
const inquirer = require("inquirer");
const db = require('./db/connection');

require('console.table');

const promptMessages = {
    viewAllEmployees: "View All Employees",
    viewByDepartment: "View All Employees By Department",
    viewByManager: "View All Employees By Manager",
    addEmployee: "Add An Employee",
    removeEmployee: "Remove An Employee",
    updateRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    viewAllRoles: "View All Roles",
    exit: "Exit"
};



const prompt = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                promptMessages.viewAllEmployees,
                promptMessages.viewByDepartment,
                promptMessages.viewByManager,
                promptMessages.viewAllRoles,
                promptMessages.addEmployee,
                promptMessages.removeEmployee,
                promptMessages.updateRole,
                promptMessages.exit
            ]
        })
        .then(answer => {
            console.log('answer', answer);
            switch (answer.action) {
                case promptMessages.viewAllEmployees:
                    viewAllEmployees();
                    break;

                case promptMessages.viewByDepartment:
                    console.table(viewByDepartment());
                    break;

                case promptMessages.viewByManager:
                    console.table(viewByManager());
                    break;

                case promptMessages.addEmployee:
                    console.table(addEmpoyee());
                    break;

                case promptMessages.removeEmployee:
                    remove('delete');
                    break;

                case promptMessages.updateRole:
                    remove('role');
                    break;

                case promptMessages.viewAllRoles:
                    console.table(viewAllRoles());
                    break;

                case promptMessages.exit:
                    connection.end();
                    break;
            }
        });
}

const viewAllEmployees = () => {
    const sql = `SELECT  employee.id, employee.first_name,employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, (CONCAT(manager.first_name, ' ', manager.last_name)) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)`

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

const viewByDepartment = () => {
    const sql = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name 
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name`;

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('View By Department');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

const viewByManager = () => {
    const sql =  `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('View By Manager');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

const viewAllRoles = () => {
    const sql = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
   
    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('View All Roles');
        console.log('\n');
        console.table(res);
        prompt();
    });

 }

//  const addEmployee = () => {

//  }


prompt();


