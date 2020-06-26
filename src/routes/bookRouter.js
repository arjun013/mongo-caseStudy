const express = require("express");
const upload = require("../model/multer.js");
const bookRouter = express.Router();
const BookData = require("../model/BookData");
const fs = require("fs");

const router = allNav => {
	//get books page
	bookRouter.get("/",(req,res) =>{
		BookData.find()
		.then( books => {
			let nav;
			if (req.session.currentUser == 'admin') {
				 nav = allNav.filter( elem => elem.show.includes('admin'));
			}else{
				 nav = allNav.filter( elem => elem.show.includes('user'));
			}
			res.render("books",{
			books,nav,
			title:"Books",
			head :"BookS"
			})
		});

	});

	//get single book page
	bookRouter.get("/:id",(req,res) =>{
		const id = req.params.id;
		BookData.findOne( { _id : id } )
		.then( books => {
			let nav;

			const user = req.session.currentUser;
			if (user == 'admin') {
				 nav = allNav.filter( elem => elem.show.includes('admin'));
			}else{
				 nav = allNav.filter( elem => elem.show.includes('user'));
			}
			res.render("book",{
			nav,
			title :"book",
			head :`BooK`,
			books,
			user
			})
		})		
	});

	//post request for updation or deletion
	bookRouter.post("/:op",(req,res) => {
			const op = req.params.op;

			//delete request
			if (op.startsWith("delete")) {
				const id = op.slice(6,op.length);
				BookData.findOneAndDelete( { _id : id } )
				.then( (book) => {
					try{
						//deleting from upload folder
						fs.unlinkSync(`./public/uploads/${book.bookImg}`);
						fs.unlinkSync(`./public/uploads/${book.authorImg}`)
					}
					catch(err){
						console.log(err);
					}		
					res.redirect("/books")
				});				
			}else if (op.startsWith("update")) {

				// request leads to updation pagee
				const id = op.slice(6,op.length);
				BookData.findOne( { _id : id } )
				.then( (book) => {
					try{
						let nav = allNav.filter( elem => elem.show.includes('admin'));
						res.render("updateBook",{
							book,
							nav,
							title:"update book",
							head:"Update Book"
						})

					}
					catch(err){
						console.log(err);
						res.redirect("/books");
					}		
					
				});				
			}else{ 
				//updation request with changed fields
				upload(req,res,(err) =>{
					
					if (err){
						res.redirect('/admin');
						console.log(err)
					} else{
							const id = op;
				BookData.findOne( { _id : id } )
				.then( (book) => {
					try{
						let images = {bookImg:'',authorImg:''}
						//to delete already existing images if changed
							for(let img in req.files){
									images[img] = req.files[img][0].filename;
									fs.unlinkSync(`./public/uploads/${book[img]}`)
							}						
						var item = {
							title : req.body.name,author :req.body.author,genre : req.body.genre,
							bookImg:images.bookImg  ,
							authorImg:images.authorImg
						}
						var currentBook = {...item};
				
						//ensure only updated fields are changed
						for(let fld in currentBook){
							if(currentBook[fld]===''||currentBook[fld]===book[fld]){
								delete currentBook[fld];//deleting unupdated field
							}
						}
						//updating database
						BookData.findOneAndUpdate( { _id : id },currentBook,(err,result) =>{
								if(err){
									console.log(err)
								}else{
									console.log('success')
								}
							})
						res.redirect("/books")
						
					}
					catch(err){
						console.log(err);
						res.redirect("/home")
					}							
					})
					}				
					})				
				}
	})
	

	return bookRouter;
}


module.exports = router;