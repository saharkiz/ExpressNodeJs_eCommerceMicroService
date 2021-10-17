const mongoose = require('mongoose');


// Seller Model

mongoose.model("Seller", {
	name: {
		type: String,
		required: true
	},
	supplier: {
		type: String,
		required: false
	},
	supplierPhone: {
		type: String,
		required: false
	},
	createdAt: {
		type: Date,
		required: true
	},
})