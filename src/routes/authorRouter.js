const express = require("express");
const authorRouter = express.Router();
const BookData = require("../model/BookData");
const fs = require("fs");
const  logged = require('./logged.js');
const router = (allNav) => {
	
	//entire author list

	authorRouter.get("/",(req,res) =>{
		logged(res,req.session.currentUser,()=>{
			let nav;
		if (req.session.currentUser == 'admin') {
			 nav = allNav.filter( elem => elem.show.includes('admin'));
		}else{
			 nav = allNav.filter( elem => elem.show.includes('user'));
		}
		BookData.find()
		.then( authors => {
			res.render("authors",{
			authors,nav,
			title:"Authors",
			head :"AuthorS"
			})
		});
		})
	});

	//single author request
	authorRouter.get("/:id",(req,res) =>{
		logged(res,req.session.currentUser,()=>{
			const id = req.params.id;
			BookData.findOne( { _id : id } )
			.then( authors => {
				let nav;

				const user = req.session.currentUser;
				if (user == 'admin') {
					 nav = allNav.filter( elem => elem.show.includes('admin'));
				}else{
					 nav = allNav.filter( elem => elem.show.includes('user'));
				}
				res.render("author",{
				nav,
				title :"author",
				head :`AuthoR`,
				authors,user
				})
			})
		})		
	});	

		
	
	
	return authorRouter;
}

module.exports = router;