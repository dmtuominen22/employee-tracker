const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
require("console.table");
const inputCheck = require('../../utils/inputCheck');