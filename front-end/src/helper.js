var jwtDecode = require('jwt-decode');
var crypto 		= require('crypto');

export function SetToken(token=null) {
    if(token==null){
        return false;
    } else {
        localStorage.setItem('_token',token);
        return true;
    }
}
export function GetToken() {
    var _token = localStorage.getItem('_token');
    if(!_token){
        return false;
    } else {
        return _token;
    }
}

export function FlushCookie() {
        localStorage.clear();
}

export function DecodeToken() {
    var token = GetToken();
    if(token){
        return jwtDecode(token);
    } else {
        return {};
    }
}

export function cryptoPassword() {
    var pass = pass.toString();
    return crypto.createHash('md5').update(pass).digest('hex');
}

export function chnageDateFormat(string) {
    var mydate = new Date(string);
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][mydate.getMonth()];
    return mydate.getDate()+ ' '+ month + ' ' + mydate.getFullYear();
}
