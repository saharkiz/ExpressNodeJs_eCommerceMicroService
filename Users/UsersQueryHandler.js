
// Load express
const express  = require("express");
const app = express()
const bodyParser = require("body-parser");
const axios = require("axios");
// Load Mongoose
const mongoose = require("mongoose");

const routerUserQuery = express.Router()
var User;
require("./User")
User = mongoose.model("User")

// GET all users
routerUserQuery.get("/users",async (req, res) => {
	User.find().then((users) => {
		res.send(users)
	}).catch((err) => {
		if(err) {
			throw err
		}
	})
})

// GET single user
routerUserQuery.get("/users/:uid",async (req, res) => {
	User.findById(req.params.uid).then((user) => {
		if(user){
			res.json(user)
		} else {
			res.sendStatus(404)
		}
	}).catch( err => {
		if(err) {
			throw err
		}
	})
})

// GET all orders for a user
routerUserQuery.get("/users/:uid/orders", async (req, res) => {
	axios.get(`http://localhost:5151/orders?uid=${req.params.uid}`).then( (orders) => {
		if(orders) {
			res.send(orders)
		}
	}).catch( err => {
		res.sendStatus(404).send(err)
	})
})

// GET all carts for a user
routerUserQuery.get("/users/:uid/carts", async (req, res) => {
	axios.get(`http://localhost:5252/carts?uid=${req.params.uid}`).then( (orders) => {
		if(orders) {
			res.send(orders)
		}
	}).catch( err => {
		res.sendStatus(404).send(err)
	})
})

module.exports = routerUserQuery