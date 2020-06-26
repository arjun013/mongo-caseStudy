const express = require("express");
const ejs = require("ejs");
const path = require("path");
const session = require('express-session');
const crypto = require("crypto");

const allNav = [	//show is to decide which one should show in correspoding page
	{		link:"/",	name:"DASH",	show:['home']	},
	{		link:"/home",		name:"HOME",		show:['user','admin']	},
	{		link:"/books",		name:"BOOKS",		show:['user','admin']	},
	{		link:"/authors",		name:"AUTHORS",		show:['user','admin']	},
	{		link:"/login",		name:"LOGIN",		show:['home']	},
	{		link:"/signup",		name:"SIGNUP",		show:['home']	},
	{		link:"/admin",		name:"ADD-BOOK",		show:['admin']	},//only username admin admin can add book
	{		link:"/",		name:"LOGOUT",		show:['user','admin']	}
];
 
//routers for pages
	const homeRouter=  require("./src/routes/homeRouter.js")(allNav);//the home page after login
	const authorRouter =  require("./src/routes/authorRouter.js")(allNav);//for authors
	const bookRouter =  require("./src/routes/bookRouter.js")(allNav);//for books
	const addBookRouter =  require("./src/routes/addBookRouter.js")(allNav);//for books
	const logSignRouter = require("./src/routes/logSignRouter.js")(allNav);//login and sign up are encoded in a single module
	const logRouter =  logSignRouter.logRouter;//for login
	const signRouter =  logSignRouter.signRouter;//for signup

const app = new express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,'src','views'));

app.use(session({
	secret:'open book',
	resave:'false',
	saveUninitialized:true,
	cookie:{
	maxAge : 1000*60*60*24
	}
}))
app.use(express.urlencoded({	extended:true	}));
app.use(express.static("./public"));
app.use('/home',homeRouter);
app.use('/books',bookRouter);
app.use('/authors',authorRouter);
app.use('/login',logRouter);
app.use('/signup',signRouter);
app.use('/admin',addBookRouter);

app.get("/", (req,res) => {
	req.session.currentUser="";//logout
	const nav = allNav.filter( elem => elem.show.includes('home'))
	res.render("index",{
		nav,
		title:"Librarian Home",
		head:"LibrariaN"
	});
});

app.get("/:x", (req,res) => {
	res.status(404).render('404');
});

const port = 5000;
app.listen(port);
console.log("Server running on port :"+port);


