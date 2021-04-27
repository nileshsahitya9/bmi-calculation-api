const express = require('express');
// controllers
const taskController = require('../controllers/taskController');

const router = express.Router();

router
    .post('/', taskController.create);

router
    .get('/', taskController.get);

module.exports = router;    