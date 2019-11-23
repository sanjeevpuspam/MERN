var app = require('./app');
var ip 	= require("ip");
var port = process.env.PORT || 3001
var host = '127.0.0.1';
app.listen(port, function() {
    console.log("app successfully started at http://%s:%s",host,port);
});