var jwt 		= require('jsonwebtoken');
var helper 		= require('../Public/helper');
var response 	= require('../Public/createResponse');
var database	= require('../Config/databaseEngine');

process.env.jwtSecret	= "User-Application_";

exports.Authentication = function(req,res){
    var OptionAuth = {
        "email" : req.body.email,
        "password" : helper.cryptoPassword(req.body.password),
    }
    database.getOneRecord(helper.tableName.user,OptionAuth,function(err,data){
        if(data){
            var tokenData = {
                '_id' 	 : data._id,
                'roleid' : data.roleid,
                'email'  : data.email,
                'name' : data.name,
                'createdBy' : data.createdBy
            }
            var token 		= jwt.sign(tokenData,process.env.jwtSecret,{expiresIn: '6h'});
            response.CreateResponse(true,'success',{'token':token},function(resData) {
                res.send(resData);
            });
        } else {
            response.CreateResponse(false,'Not a valid user',null,function(resData) {
                res.send(resData);
            });
        }
    });
}