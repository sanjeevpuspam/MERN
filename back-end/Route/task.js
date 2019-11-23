const express 	= require('express');
const router 	= express.Router();


const main = require('../Controllers/task');


router.post('/new-task',main.inserTask);
router.get('/get-tasks',main.getTaskList);

module.exports = router;