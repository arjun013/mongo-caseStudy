const express = require("express");
const ejs = require("ejs");
const logRouter = express.Router();
const signRouter = express.Router();
const SignData = require("../model/signupData.js");

var logMsg='', signMsg ='';
const router = allNav =>{

	const nav = allNav.filter( elem => elem.show.includes('home'));
	logRouter.get('/', (req,res) => {
			res.render("login",{
			nav,
			logMsg,
			title:"login",
			head:"Log In"
		})
			logMsg='';
	});

	//login credentials not working
	logRouter.get('/retry', (req,res) => {
		logMsg='Invalid User Credentials';
			res.redirect("/login");

	});

	//access books, authorsor home without log in
	logRouter.get('/logFirst', (req,res) => {
		logMsg='You must login First';
			res.redirect("/login");

	});
	
	//new signup
	signRouter.get('/', (req,res) => {
			res.render("signup",{
			nav,
			title:"signup",
			head:"Sign-Up",
			signMsg
		})
			signMsg = '';
	});

	//signup submit
	signRouter.post('/login', function(req, res) {
		var userData = {
				name : req.body.name,
				email : req.body.email,
				mobile : req.body.mobile,
				dob : req.body.dob,
				username : req.body.username,
				password : req.body.password			
		}

		//avoid username or email repetition

		SignData.findOne({ $or : [{username : userData.username},{email:userData.email}]})
		.then( (user) => {
			if (user) {
			user.username===userData.username?signMsg="Username Taken":signMsg="Email already in use";
			res.redirect('/signup/retry');
			}else{
				//signup success
				console.log("user")
				var user =SignData(userData);
		  		user.save();
		  		logMsg = "Profile Created .Please Login"
		  		res.redirect('/login');
			}			
		})
		.catch( (err)=>{
			console.log(err)
		})
  		
	});
	//sign up failed due to data redundancy
	signRouter.get('/retry', (req,res) =>{
		res.redirect('/signup');
	})
	return {logRouter,signRouter};
}

module.exports = router;
