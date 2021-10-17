const mongoose = require('mongoose');


// Product Model
mongoose.model("Product", {
	sku: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	sellerId: {
		type: Number,
		required: false
	},
	amount: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: false
	},
	createdOn: {
		type: Date,
		required: true
	},
	qty: {
		type: Number,
		required: false
	},
	qtythreshold: {
		type: Number,
		required: false
	},
	standardPrice:{
		type: Number,
		required:false
	},
	deliveryLeadTime:{
		type: Date,
		required:false
	},
	minOrderQty:{
		type: Number,
		required:false
	},
	maxOrderQty:{
		type: Number,
		required:false
	}

})