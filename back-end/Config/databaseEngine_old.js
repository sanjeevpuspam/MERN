var database    = require('./db');
var mongodb     = require('mongodb');

module.exports.getAllRecords = function(tableName, data, callBack,limit=null){
    if(limit == null){
        database.db.collection(tableName).find({}).toArray(function(err, results) {
            if(err){
                return callBack(err,null);
            }
            return callBack(null,results);
        });
    } else {
        database.db.collection(tableName).find().limit(limit).toArray(function(err, results) {
            if(err){
                return callBack(err,null);
            }
            return callBack(null,results);
        });
    }
};

module.exports.insertData = function(tableName,data,callBack){ 
	database.db.collection(tableName).insertOne(data,function(err,results){  
       if(err){  
         return callBack(err,null);  
       }  
       return callBack(null,results);
    });
};
module.exports.getOneRecord = function(tableName,data,callBack){ 
	database.db.collection(tableName).findOne(data,function(err,results){  
       if(err){  
         return callBack(err,null);  
       }  
       return callBack(null,results);
    });
};
module.exports.updateData = function(tableName,myQuery,newValues,callBack){
    database.db.collection(tableName).updateOne(myQuery, {$set: newValues}, function(err, results) {
        if (err) {
            return callBack(err,null);
        }
        return callBack(null,results);
    });
};

module.exports.getRecordsByQuery = function(tableName,data,callBack){
    database.db.collection(tableName).find(data).toArray(function(err, results) {
        if(err){
            return callBack(err,null);
        }
        return callBack(null,results);
    });
};

module.exports.deleteOneRecord = function(tableName,data,callBack){
    database.db.collection(tableName).deleteOne(data, function(err, results){
        if(err){
            return callBack(err,null);
        }
        return callBack(null,results);
    });
};

module.exports.doSortRecords = function(tableName,type,callBack){
   // { name: 1 } // ascending
    //{ name: -1 } // descending
    database.db.collection(tableName).find().sort(type).toArray(function(err, results) {
        if(err){
            return callBack(err,null);
        }
        return callBack(null,results);
    });
};
