// Load express
const express  = require("express");
const app = express()
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

// Load Mongoose
const mongoose = require("mongoose");
var VerifyToken = require('./AuthVerify/VerifyToken'); 
var User;
async function connectMongoose() {
	require('./db.js');
	require("./Users/User")
	User = mongoose.model("User")
}


// Load initial modules
async function initialLoad() {
	await connectMongoose();
}

initialLoad()
/**
 * IMPROVEMENT: Each API can sit in a different file if we want to scale the application to perform larger operations
 */

// Main endpoint
app.get("/", (req, res) => {
	res.send("This is our main endpoint")
})
const routerUserQuery = require('./Users/UsersQueryHandler.js')
app.use(routerUserQuery);

// Create new user
app.post("/user", async (req, res) => {
	const newUser = {
		"name":req.body.name,
		"firstName":req.body.firstName,
		"lastName": req.body.lastName,
		"email":req.body.email,
		"phone": req.body.phone,
		"address": req.body.address,
		"orders": req.body.orders,
		"password": req.body.password
	}
	// Create new User instance..
	const user = new User(newUser)
	user.save().then((r) => {
		res.send("User created..")
	}).catch( (err) => {
		if(err) {
			throw err
		}
	})
	
})

// Delete user by userId
app.delete("/users/:uid", async (req, res) => {
	User.findByIdAndDelete(req.params.uid).then(() => {
		res.send("User deleted with success...")
	}).catch( () => {
		res.sendStatus(404)
	})
})


//------------ORDER ---------------
// Create new order for a user
app.post("/users/:uid/order", async (req, res) => {
	try {
		const orderResponse = await axios.post("http://localhost:5151/order",{
			sku: req.body.sku,
			name:req.body.name,
			customerId: req.params.uid,
			amount:req.body.amount,
			image:req.body.image,
			createdAt:req.body.createdAt,
			qty:req.body.qty
		})
		
		if(orderResponse.status === 200) {
			User.findById(req.params.uid, (err, user) => {
				user.orders.push(orderResponse.data._id)
				user.save().then(() => {
					res.send(`Order created for user:${user.email} with orderId:${orderResponse.data._id}`)
				}).catch(e => {
					res.send("failed to add orderId in user's doc")
				})
			})	
		} else {
			res.send("Order not created..")
		}
	} catch (error) {
		res.sendStatus(400).send("Error while creating the order")
		
	}
})

// Delete all the orders for an user
app.delete("/users/:uid/orders", async (req, res) => {
	axios.delete(`http://localhost:5151/orders?uid=${req.params.uid}`).then( delRes => {
		if(delRes.data.success) {
			res.send("Orders deleted..")
		} else {
			res.sendStatus(404).send(delRes.data)
		}
	}).catch( (err) => {
		res.sendStatus(404).send(err)
	})
})


//-------------------CART -------------------
// Create new cart for a user
app.post("/users/:uid/cart", async (req, res) => {
	try {
		const cartResponse = await axios.post("http://localhost:5252/cart",{
			name:req.body.name,
			customerId: mongoose.Types.ObjectId(req.params.uid),
			amount:req.body.amount,
			image:req.body.image,
			createdAt:req.body.createdAt,
			qty:req.body.qty
		})
		
		if(cartResponse.status === 200) {
			User.findById(req.params.uid, (err, user) => {
				user.carts.push(cartResponse.data._id)
				user.save().then(() => {
					res.send(`cart created for user:${user.email} with cartId:${cartResponse.data._id}`)
				}).catch(e => {
					res.send("failed to add cartId in user's doc")
				})
			})	
		} else {
			res.send("cart not created..")
		}
	} catch (error) {
		res.sendStatus(400).send("Error while creating the cart")
		
	}
})

// Delete all the carts for an user
app.delete("/users/:uid/carts", async (req, res) => {
	axios.delete(`http://localhost:5252/carts?uid=${req.params.uid}`).then( delRes => {
		if(delRes.data.success) {
			res.send("carts deleted..")
		} else {
			res.sendStatus(404).send(delRes.data)
		}
	}).catch( (err) => {
		res.sendStatus(404).send(err)
	})
})


//----------------END CART ----------------
// APP listening on port 5050
app.listen(5050, () => {
	console.log("Up and running! Port 5050 -- This is our Users service for Public API - ver:3.1000")
})