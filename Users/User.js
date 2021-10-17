const mongoose = require('mongoose');


// User Model

mongoose.model("User", {
	name: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: false
	},
	orders: {
		type: Array,
		required: true
	},
  	password:{
		type: String,
		required: true
	},
})