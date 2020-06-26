const express = require("express");
const ejs = require("ejs");

const homeRouter = express.Router();
var currentUser='';
const SignData = require("../model/signupData.js");
// const MongoStore = require('connect-mongo')(session);

const router = (allNav) =>{

homeRouter.get("/",(req,res) =>{
      let nav;
      if (req.session.currentUser == 'admin') {
         nav = allNav.filter( elem => elem.show.includes('admin'));
      }else{
         nav = allNav.filter( elem => elem.show.includes('user'));
      }
      res.render("home",{
      nav,
      title:"home",
      head:`${req.session.currentUser}`
    })
  })
//login request
homeRouter.post('/', function(req, res) {
		var logger = {
				user : req.body.username,
				pass : req.body.password			
		}
				SignData.findOne({username : logger.user,password:logger.pass})
  				.then( user =>{
            if(!user) throw err;
  					req.session.currentUser = logger.user;
  					let nav;
  					if (req.session.currentUser == 'admin') {
  						 nav = allNav.filter( elem => elem.show.includes('admin'));
  					}else{
  						 nav = allNav.filter( elem => elem.show.includes('user'));
  					}
  					
					res.render("home",{
					nav,
					title:"home",
					head:`${req.session.currentUser}`
					})
					
  				}).catch( (err) => {
  					res.redirect("/login");
  				})
  		
	});
  
    return  homeRouter;
}
module.exports = router;
