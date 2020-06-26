const express = require("express");
const multer = require("multer");
const path = require("path");

//setting multer storage to uploads
const storage = multer.diskStorage({
	destination:`./public/uploads`,
	filename: function(req,file,callBack){
		callBack(null,"img"+Date.now()%100000+path.extname(file.originalname));
	}
});
const upload = multer({
	storage:storage
}).fields([
  { name: 'bookImg', maxCount: 1 },
  { name: 'authorImg', maxCount: 1 }
])
module.exports = upload; 
