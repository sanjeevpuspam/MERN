const express 	= require("express");
var bodyParser 	= require('body-parser');
const app 		= express();
const cors 		= require('cors');

//#################Route######################//
const user = require('./Route/user');
const task = require('./Route/task');
const auth = require('./Auth/authenticate');



//#############################################//


//--------*****----------------//
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
var jsonParser = bodyParser.text({ limit: '50mb' });

app.use(cors());
//#################Api######################//

app.post('/login',auth.Authentication);
app.use("/Api", user);
app.use("/Api", task);



//############################################//



module.exports = app;


