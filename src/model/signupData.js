const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/library");
const Schema = mongoose.Schema;

const SignSchema = new Schema({
	name : String,
	email : String,
	mobile : String,
	dob : Date,
	username : String,
	password : String
});
var SignData = mongoose.model('user',SignSchema);
module.exports = SignData;