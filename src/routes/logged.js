const express = require("express");

//not load pages if not logged in
const loggedCheck = (res,inUse,callBack )=>{
	if(inUse=='') res.redirect('/login/logFirst')//alert to login before access pages
	else{
		callBack()
	}
}
module.exports = loggedCheck;

