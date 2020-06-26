const express = require("express");
const ejs = require("ejs");

const homeRouter = express.Router();
var currentUser='';
const SignData = require("../model/signupData.js");
const  logged = require('./logged.js');

const router = (allNav) =>{


homeRouter.get("/",(req,res) =>{

  //deny access if not logged in
  logged(res,req.session.currentUser,()=>{
    let nav;
      if (req.session.currentUser == 'admin') {
         nav = allNav.filter( elem => elem.show.includes('admin'));
      }else{
         nav = allNav.filter( elem => elem.show.includes('user'));
      }
      res.render("home",{
      nav,
      title:"home",
      head:`${currentUser} home`
    })
  })
      
})

//login request
homeRouter.post('/', function(req, res) {
		var logger = {
				user : req.body.username,
				pass : req.body.password			
		}
        //login should recieve  username or email
				SignData.findOne({
          $and : [
            {password:logger.pass},
            {$or :[{username:logger.user},{email:logger.user}]}
          ]
        })
  				.then( user =>{
            if(!user) throw err;
            //checks admin or not for complete access
  					req.session.currentUser = user.username;
  					let nav;
            currentUser=user.name;
  					if (req.session.currentUser == 'admin') {
  						 nav = allNav.filter( elem => elem.show.includes('admin'));
  					}else{
  						 nav = allNav.filter( elem => elem.show.includes('user'));
  					}
  					
					res.render("home",{
					nav,
					title:"home",
					head:`${currentUser} home`
					})
					
  				}).catch( (err) => {
            //failed login redirects to login 
  					res.redirect("/login/retry");
  				})
  		
	});
  
    return  homeRouter;
}
module.exports = router;
