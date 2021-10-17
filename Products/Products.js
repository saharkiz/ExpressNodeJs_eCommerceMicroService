
// Load express
const express  = require("express");
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

// Load Mongoose
const mongoose = require("mongoose");
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema
// Global Product Object which will be the instance of MongoDB document
var Product;

async function connectMongoose() {
	require('./shared/mongoose');
	//require("./Product");
	//Product = mongoose.model("Product")
	var ProductSchema = new Schema({
			sku:  { type: String,es_indexed:true },
			name:  { type: String,es_indexed:true },
			sellerId: Number,
			amount:  Number,
			image:  String,
			createdOn: Date,
			qty:  Number,
			qtythreshold: Number
		}
	)

	Product = mongoose.model("Product", ProductSchema);  
	ProductSchema.plugin(mongoosastic
		/*,{  
		  host:"host",
		  port: 10293,
		  protocol: "https",
		  auth: "username:password"
		}*/
		);
}


// Define the Initial load
async function initialLoad() {
	await connectMongoose();
}

initialLoad()

app.post('/search', function(req, res) {
	var terms=req.body.terms;
  Product.search({ query_string: { query:body.q } }, function(err,results) {
    res.json(products)
  });

});
// GET all products for a user
// GET single product for a user
app.get("/products",async (req, res) => {
	
		Product.find().then( products => {
			if(products) {
				res.json(products)
			} else {
				res.sendStatus(404)
			}
		}).catch( (err) => {
			res.status(404).send(`Convertion error :: ${err}`)
		})
})

// Create an product for a user
app.post("/product", async (req, res) => {
	const newProduct = {
		"sku":req.body.sku,
		"name":req.body.name,
		"sellerId":req.body.sellerId,
		"amount":req.body.amount,
		"image":req.body.image,
		"createdOn":req.body.createdOn,
		"qty":req.body.qty,
		"qtythreshold":req.body.qtythreshold
	}
	
	// Create new Product instance..
	const product = new Product(newProduct)
	product.save().then((productObj) => {
		res.send(productObj)
	}).catch( (err) => {
		if(err) {
			throw err
		}
	})
	
})


// Delete a single product
app.delete("/products/:oid", async (req, res) => {
	Product.findByIdAndDelete(req.params.oid).then(() => {
		res.send("Product deleted with success...")
	}).catch( () => {
		res.sendStatus(404)
	})
})

// Delete all products for a user
app.delete("/products", async (req, res) => {
	Product.findOneAndDelete({customerId: req.query.uid}).then((o) => {
		if(o) {
			res.send({success:true})
		} else {
			res.sendStatus(404)
		}
	}).catch( () => {
			res.sendStatus(404)
		})
})
app.use(function(err, req, res, next) {
      // This is error handler
      res.status(err.status || 500);
     res.end();
    });

app.get("/", (req, res) => {
	res.send("This is our main endpoint")
})
// APP listening on port 5252
app.listen(5252, () => {
	console.log("Up and running! -- This is our Products service")
})