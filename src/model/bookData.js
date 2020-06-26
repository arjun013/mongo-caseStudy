const mongoose = require("mongoose");
const multer = require("multer");
mongoose.connect("mongodb://localhost:27017/library");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title : String,
	author : String,
	genre : String,
	bookImg : String,
	authorImg : String
});
var BookData = mongoose.model('bookData',BookSchema);
module.exports = BookData;
