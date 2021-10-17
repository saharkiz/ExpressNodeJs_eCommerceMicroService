const mongoose = require('mongoose');


// Inventory Model
mongoose.model("Inventory", {
	productId: {
		type: Number,
		required: true
	},
	itemDescription: {
		type: String,
		required: false
	},
	sellerId: {
		type: Number,
		required: false
	},
	bundleId: {
		type: Number,
		required: false
	},
	createdOn: {
		type: Date,
		required: true
	},
	brandId: {
		type: Number,
		required: false
	},
	reorderLevel: {
		type: Number,
		required: false
	},
	reorderQty: {
		type: Number,
		required: false
	},

})

// StockLevel Model
mongoose.model("StockLevel", {
	productId: {
		type: Number,
		required: true
	},
	createdOn: {
		type: Date,
		required: true
	},
    stockTakingDate: {
		type: Date,
		required: true
	},
	qty: {
		type: Number,
		required: false
	}
})