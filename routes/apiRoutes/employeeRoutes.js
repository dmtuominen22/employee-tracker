const express = require('express');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
require("console.table");

// view all employees information from all tables
router.get('/employee', (req, res) => {
    const sql = `SELECT  employee.first_name,employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, (CONCAT(manager.first_name, ' ', manager.last_name)) AS manager
    FROM employee
      LEFT JOIN employee manager on manager.id = employee.manager_id
      INNER JOIN role ON (role.id = employee.role_id)
      INNER JOIN department ON (department.id = role.department_id)`;

     db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//view all employee by Manager


//update employee Manager


//add an employee



//remove Employee


module.exports = router;