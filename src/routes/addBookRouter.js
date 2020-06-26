const express = require("express");
const ejs = require("ejs");
const upload = require("../model/multer.js");
const BookData = require("../model/BookData");
const addBookRouter = express.Router();
const  logged = require('./logged.js');

const fields = [
		{			type:"text",			id:"name",			label:"BOOK NAME",			accept:""		},
		{			type:"text",			id:"author",		label:"AUTHOR NAME",			accept:""		},
		{			type:"text",			id:"genre",			label:"GENRE",			accept:""		},
		{			type:"file",			id:"bookImg",			label:"IMAGE OF BOOK",			accept:"image/*"	},
		{			type:"file",			id:"authorImg",			label:"IMAGE OF AUTHOR",			accept:"image/*"		}		
	]

const router = allNav =>{

	addBookRouter.get("/",(req,res) =>{
		logged(res,req.session.currentUser,()=>{
				//only admin should access
				if(req.session.currentUser=='admin'){
					const nav = allNav.filter( elem => elem.show.includes('admin'));
					res.render("addBook",{
					nav,
					fields,
					title:"add book",
					head:"New Book"
				})
				}else{//back to homepage if user is not admin
					res.redirect('/home');
				}
		})
		
	})
	addBookRouter.post('/book', function(req, res) {
		upload(req,res,(err) =>{
			if (err){
				res.redirect('/admin');
				console.log(err)
			} 
			else{
				var item = {
					title : req.body.name,
					author :req.body.author,
					genre : req.body.genre,
					bookImg : req.files.bookImg[0].filename,
					authorImg : req.files.authorImg[0].filename
				}
		  		var book =BookData(item);
		  		book.save();
		  		res.redirect('/books');
				}
		})
		
	});
	

	return addBookRouter;

};
module.exports = router;
