var MongoClient = require('mongodb').MongoClient;
var dbName		= 'UserApplication';
var host      	= "localhost";
var url 		= 'mongodb://'+host+':27017/';

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if(err){
	  console.log("Error : mongodb not running");
	} else {
		module.exports.db =  db.db(dbName);
	}
});
module.exports.dbName =  dbName;

/*MongoClient.connect(url, { useNewUrlParser: true }, function(err,db) {
    if (err) throw err;
    var myobj = {
        "email": 		'sanjeev.puspam@gmail.com',
        "username": 'sanjeevpuspam',
        "password": 	'2d637ea66732416664371ad2f4c9d94d',
        "name": 		'sanjeev puspam',
        "phone": 		'9911563697',
        "status": 		1,
        "is_admin": 1,
        "created_by": 	1,
        "created_on": 	"2018-10-16 23:27:54",
        "ModifyOn" :	''
	};
    db.db(dbName).collection("users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});*/

/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.db(dbName).collection("tracking").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbs = db.db("MarketingManagement");
    dbs.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbs = db.db("MarketingManagement");
    var myquery = { email: 'puspam.sanjeev@tft12us.com',display_name:'sanjeev puspam'};
    dbs.collection("users").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        db.close();
    });
});*/

