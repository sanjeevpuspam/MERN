const bcrypt 			= require('bcrypt');
const db 				= require('../Config/databaseEngine');
const helperResponse 	= require('../Public/createResponse');
const helper 			= require('../Public/helper');


module.exports = {
    inserTask: function(req, res){
        const tableName   = helper.tableName.task;
        let data = {
            "title" : req.body.title,
            "description" : req.body.description,
            "assigned_to" : req.body.assigned_to,
            "deadline" : helper.currentDate(req.body.deadline),
            "assigned_by" : req.body.assigned_by,
            "assigned_date" : helper.currentDate(),
            "category" : 1
        }
       db.insertData(tableName,data,function(err,data){
           helperResponse.CreateResponse(true,'Task registered successfully',null,function(resData) {
                res.send(resData);
            });
        });
    },

    getTaskList: function(req, res){
        status = false;
        db.getAllRecords(helper.tableName.task,function(status,data){
            if (status) {
                helperResponse.CreateResponse(status, 'something went wrong', data,function(response) {
                    res.send(response);
                });
            } else {
                status = true;
                console.log(data);
                helperResponse.CreateResponse(status, '', data, function (response) {
                    res.send(response);
                });
            }
        });
    }
}
