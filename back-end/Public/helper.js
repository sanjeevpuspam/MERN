var request = require('request');
var fs      = require('fs');
var crypto 	= require('crypto');



module.exports.tableName = {
    "user": "users",
    "task" : "tasks"
}

module.exports.currentDate = function(date=null){
    if(date!=null){
        var date = (new Date ((new Date((new Date(new Date(date))).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    } else {
        var date = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    }
    return date;
};

module.exports.cryptoPassword = function(pass){
    var pass = pass.toString();
    return crypto.createHash('md5').update(pass).digest('hex');
};

module.exports.slugify = function(string) {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with ‘and’
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple — with single -
        .replace(/^-+/, '') // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
};