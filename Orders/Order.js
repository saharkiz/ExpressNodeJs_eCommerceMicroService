const mongoose = require('mongoose');


// Order Model

mongoose.model("Order", {
	sku: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	customerId: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true
	},
	qty: {
		type: Number,
		required: false
	}

})