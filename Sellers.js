// Load express
const express  = require("express");
const app = express()
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

// Load Mongoose
const mongoose = require("mongoose");

// Global Seller Object which will be the instance of MongoDB document
var Seller;
async function connectMongoose() {
	await mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
		console.log("mongoose connected..")
	})
	require("./Sellers/Seller");
	Seller = mongoose.model("Seller")
}


// Define the Initial load
async function initialLoad() {
	await connectMongoose();
}

initialLoad()

// GET all sellers 
app.get("/sellers",async (req, res) => {
	Seller.find().then((sellers) => {
		res.send(sellers)
	}).catch((err) => {
		if(err) {
			throw err
		}
	})
})

// Create an seller for a user
app.post("/seller", async (req, res) => {
	const newSeller = {
		"name":req.body.name,
		"createdAt":req.body.createdAt,
	}
	
	// Create new Seller instance..
	const seller = new Seller(newSeller)
	seller.save().then((sellerObj) => {
		res.send(sellerObj)
	}).catch( (err) => {
		if(err) {
			throw err
		}
	})
	
})


// Delete a single seller
app.delete("/sellers/:oid", async (req, res) => {
	Seller.findByIdAndDelete(req.params.oid).then(() => {
		res.send("Seller deleted with success...")
	}).catch( () => {
		res.sendStatus(404)
	})
})

app.patch("/sellers/:id", async (req, res) => {
	try {
		const pseller = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			pseller.name = req.body.name
		}

		await pseller.save()
		res.send(pseller)
	} catch {
		res.status(404)
		res.send({ error: "Seller doesn't exist!" })
	}
})


app.use(function(err, req, res, next) {
      // This is error handler
      res.status(err.status || 500);
     res.end();
    });
// APP listening on port 5555
app.listen(5555, () => {
	console.log("Up and running! -- This is our Sellers service")
})