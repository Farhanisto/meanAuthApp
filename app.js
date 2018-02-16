const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const config = require("./config/database")
const mongoose = require("mongoose");

mongoose.connect(config.database);
mongoose.connection.on('connected',() => {
  console.log("mongo db is connected"+ config.database)
});
mongoose.connection.on('error',(err) => {
    console.log("DB error"+ err)
});

const app = express();
const users = require('./routes/users');
//const users = require('./routes/users');
const port = 3000;
//cors MIDDLEWARE
app.use(cors());

//bodyParser MIDDLEWARE
app.use(bodyParser.json());

//passport MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport)
//set up the users routes
app.use("/users", users)

//set up static folder
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
   res.send("Invalid Endpoint'");
});

app.listen(port, ()=>{
    console.log("Server started on port " + port)
})