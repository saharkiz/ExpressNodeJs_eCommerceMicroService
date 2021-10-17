const mongoose = require('mongoose');

/*await mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology:true }).then(() =>{
	console.log("mongoose connected..")
})*/

mongoose.connect('mongodb://localhost:27017/mongodbMoscord', 
{   
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
