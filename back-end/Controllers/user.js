const bcrypt 			= require('bcrypt');
const db 				= require('../Config/databaseEngine');
const helperResponse 	= require('../Public/createResponse');
const helper 			= require('../Public/helper');


module.exports = {
    getUserList: function(req, res){
        db.getAllRecords(helper.tableName.user,function(status,data){
            if (status) {
                helperResponse.CreateResponse(status, 'Something went wrong', data,function(response) {
                    res.send(response);
                });
            }
            else {
                helperResponse.CreateResponse(status, '', data, function (response) {
                    res.send(response);
                });
            }
        });
    },
    login: function(req, res){
        var password = (req.body.password);

        var dataJson = {
            'username' : (req.body.username)
        }
        db.getRecordsByQuery(helper.tableName.user,dataJson,function(err,data){
            if(data.length > 0){
                console.log(data);
            } else {
                console.log(data);
            }

        });
    },

    userRegistration : function(req,res){

        try{
            var tableName       = helper.tableName.user;
            const userEmail 	= req.body.email;
            const createdBy 	= req.decoded._id;
            const roleid 		= 1; //req.body.roleid

            var userData = {
                "roleid": 		roleid,
                "email": 		req.body.email,
                "password": 	helper.cryptoPassword(req.body.password),
                "name": 		req.body.name,
                "contact": 		req.body.contact,
                "address": 		req.body.address,
                "status": 		1,
                "createdBy": 	createdBy,
                "createdon": 	helper.currentDate(),
                "ModifyOn" :	''
            }
            //console.log(userData);
            var createdRoleId = req.decoded.roleid;

            if(createdRoleId == helper.GetRole.SuperAdmin && roleid != helper.GetRole.Admin){
                response.CreateResponse(true,'SuperAdmin can create only Admin',null,function(resData) {
                    res.send(resData);
                });
            }
            else if(createdRoleId == helper.GetRole.Admin && (roleid != helper.GetRole.Advertiser && roleid != helper.GetRole.Publisher)){
                response.CreateResponse(true,'Admin can create Advertiser and Publisher',null,function(resData) {
                    res.send(resData);
                });
            }
            else if(createdRoleId >= 3){
                response.CreateResponse(true,'Invalid attempt',null,function(resData) {
                    res.send(resData);
                });
            }
            else {
                var myQuery = {email: userEmail};
                database.getOneRecord(tableName,myQuery,function(err,data){
                    if(data){
                        if(userEmail == data.email){
                            response.CreateResponse(false,'user already exists',null,function(resData) {
                                res.send(resData);
                            });
                        }
                    } else {
                        database.insertData(tableName,userData,function(err,data){
                            response.CreateResponse(true,'user registered successfully',null,function(resData) {
                                res.send(resData);
                            });
                        });
                    }
                });

            }

        } catch(err){
            console.log(err);
        }
    },

    updateUserData: function (req,res){
        const tableName = helper.tableName.user;
        var status = false;
        var email = req.body.email;
        var id  = req.body.id;
        const newValues  = { "name": req.body.name, "phone": req.body.phone }
        var myQuery = { "email" : email }
        db.getRecordsByQuery(tableName,myQuery,function(err,data){
            if(data){
                if(data.length == 0){
                    helperResponse.CreateResponse(status, 'Wrong user', data, function (response) {
                        res.send(response);
                    });
                } else {
                    db.updateData(tableName,myQuery,newValues,function(err,data){
                        helperResponse.CreateResponse(true,'user`s updated successfully',null,function(resData) {
                            res.send(resData);
                        });
                    });
                }
            }
        });
    }
}