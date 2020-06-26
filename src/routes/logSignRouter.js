const express = require("express");
const ejs = require("ejs");
const logRouter = express.Router();
const signRouter = express.Router();
const SignData = require("../model/signupData.js");

const router = allNav =>{
	logRouter.get('/', (req,res) => {
			const nav = allNav.filter( elem => elem.show.includes('home'));
			res.render("login",{
			nav,
			title:"login",
			head:"Log In"
		})
	});
	
	signRouter.get('/', (req,res) => {
			const nav = allNav.filter( elem => elem.show.includes('home'));
			res.render("signup",{
			nav,
			title:"signup",
			head:"Sign-Up"
		})
	});
	signRouter.post('/login', function(req, res) {
		var userData = {
				name : req.body.name,
				email : req.body.email,
				mobile : req.body.mobile,
				dob : req.body.date,
				username : req.body.username,
				password : req.body.password			
		}
  		var user =SignData(userData);
  		user.save();
  		res.redirect('/login');
	});
	return {logRouter,signRouter};
}

module.exports = router;
