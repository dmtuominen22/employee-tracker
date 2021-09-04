const express = require('express');
const inquirer = require('inquirer');
const router = express.Router();
require("console.table");

router.use(require('./employeeRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./departmentRoutes'));

module.exports = router;
