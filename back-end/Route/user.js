const express 	= require('express');
const router 	= express.Router();

const main = require('../Controllers/user');





router.get('/userlist',main.getUserList);
router.post('/register',main.userRegistration);
router.post('/update-userprofile',main.updateUserData);


module.exports = router;
