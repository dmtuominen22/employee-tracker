'use strict';

const inquirer = require("inquirer");
const db = require('./db/connection');

require('console.table');

const promptMessages = {
    viewByDepartment: "View All Department",
    viewAllRoles: "View All Roles",
    viewAllEmployees: "View All Employees",
    addDepartment: "Add A Department",
    addRole: "Add A Role",
    // addEmployee: "Add A Employee",
    // updateEmployeeRole: "Update Employee Role",
    viewByManager: "View All Employees By Manager",
    viewEmployeeByDepartment: "View Employee By Department",
    exit: "Exit"
};

const prompt = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                promptMessages.viewByDepartment,
                promptMessages.viewAllRoles,
                promptMessages.viewAllEmployees,
                promptMessages.addDepartment,
                promptMessages.addRole,
                // promptMessages.addEmployee,
                // prommpMessages.updateEmployeeRole,
                promptMessages.viewByManager,
                promptMessages.viewEmployeeByDepartment,
                promptMessages.exit
            ]
        })
        .then(answer => {
            console.log('answer', answer);
            switch (answer.action) {
                case promptMessages.viewByDepartment:
                    viewByDepartment();
                    break;

                case promptMessages.viewAllRoles:
                    viewAllRoles();
                    break;

                case promptMessages.viewAllEmployees:
                    viewAllEmployees();
                    break;

                case promptMessages.addDepartment:
                    addDepartment();
                    break;

                case promptMessages.addRole:
                    addRole();
                    break;

                // case promptMessages.addEmployee:
                //     addEmployee();
                //     break;

                // case promptMessages.updateEmployeeRole:
                //     updateRole();
                //     break;

                case promptMessages.viewByManager:
                    viewByManager();
                    break;

                case promptMessages.viewEmployeeByDepartment:
                    viewEmployeeByDepartment();
                    break;

                case promptMessages.exit:
                    db.end();
                    break;
            }
        });
}

//view all departments showing department names and department id
const viewByDepartment = () => {
    const sql = `SELECT department.name AS department, department.id AS department_ID 
    FROM department;`;

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('View By Departments');
        console.table(res);
        prompt();
    });

}

//view all roles, job title, role id, department and salary for that role
const viewAllRoles = () => {
    const sql = `SELECT role.title, role.id, department.name AS department_name, role.salary
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('View All Roles');
        console.table(res);
        prompt();
    });

}


//view all employee, employee id, first name, last name, job titles, departmen,t salaries manager
const viewAllEmployees = () => {
    const sql = `SELECT  employee.id, employee.first_name,employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, (CONCAT(manager.first_name, ' ', manager.last_name)) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id);`;

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('View all Employees');
        console.table(res);
        prompt();
    });
}

//add department to the department table
function addDepartment() {
    inquirer.prompt({
        name: 'Department',
        type: 'input',
        message: 'Please enter the Department Name'
    })
        .then(answer => {
            const sql = `INSERT into department (name) VALUES ('${answer.Department}');`;
            db.promise().query(sql)
                .then(([rows, fields]) => {
                    prompt();
                });
        });
}

// //add role name, salary and department
function addRole() {
      return db.query(`SELECT department.name AS department, department.id AS department_id
    FROM department`, (err, res) => {
        if (err) throw err;
        console.log('View By Departments');
        console.log(res);
  
    var fullDepartmentList = [];
        for (let i = 0; i < res.length; i++) {
            fullDepartmentList.push(res[i].department);
          };
        console.log (fullDepartmentList);
  
    inquirer.prompt([
        {
        name: 'Title',
        type: 'input',
        message: 'Please enter the title'},
     
       { name: 'Salary',
        type: 'input',
        message: 'Please enter the salary'},
      
        {name: 'Department',
        type: 'checkbox',
        message: 'Please select the Department',
        choices: fullDepartmentList,
    }
    
    ])

    .then(answer => {
        const sql = `INSERT into role (title, salary, department_id) VALUES ('${answer.Title}', '${answer.Salary}', '${answer.Department}');`;
        
        const sql = `select id from department
        where name = '${answer.Department}';`;

        db.promise().query(sql)
            .then(([rows, fields]) => {
                prompt();
        });
});
});
}

// //add new employee, employee fist name, last name, role and manager 
// const addEmployee = () => {
//     const sql = ``;

//     return db.query(sql, (err, res) => {
//         if (err) throw err;
//         console.log('Add a Employee');
//         console.table(res);
//         prompt();
//     });
// }

// //update Employee role, select an employee to  update there role 
// const updateEmployeeRole = () => {
//     const sql = ``;

//     return db.query(sql, (err, res) => {
//         if (err) throw err;
//         console.log('Update Employee Role');
//         console.table(res);
//         prompt();
//     });
// }

//extra credit views by Manager
const viewByManager = () => {
    const sql = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('View By Manager');
        console.table(res);
        prompt();
    });
}


//extra credit view employee by department
const viewEmployeeByDepartment = () => {
    const sql = `SELECT department.name AS department, employee.first_name, employee.last_name, role.title, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY department;`;

    return db.query(sql, (err, res) => {
        if (err) throw err;
        console.log('View Employee By Department');
        console.table(res);
        prompt();
    });

}

prompt();


