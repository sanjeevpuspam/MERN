var MongoClient = require('mongodb').MongoClient;

var dbName		= 'MarketingManagement';
var host      = "192.168.104.96";
//var host        = "172.16.201.29";
var url 		= 'mongodb://'+host+':27017/';

MongoClient.connect(url, function(err, db) {
  if(err){
	  console.log("Error : mongodb not running");
	} else {
		module.exports.db =  db.db(dbName);
	}
});

module.exports.dbName =  dbName;


/*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myobj = {
        "roleid": 		1,
        "email": 		'puspam.sanjeev@tftus.com',
        "password": 	'2d637ea66732416664371ad2f4c9d94d',
        "name": 		'sanjeev puspam',
        "contact": 		'7428843326',
        "address": 		'OLD DLF Colony Sec 14, Gurgon',
        "status": 		1,
        "createdBy": 	1,
        "createdon": 	"2018-01-09 16:27:54",
        "ModifyOn" :	''
	};
    db.db(dbName).collection("users").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
MongoClient.connect(url, function(err, db) {
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

