const express = require('express');
const router = express.Router();
const User = require("../models/users");
const passport = require("passport");
const jwt = require("jsonwebtoken");


//Register Route
router.post('/register',(req,res,next) => {
   let newUser = new User({
       name : req.body.name,
       username: req.body.username,
       email: req.body.email,      
       password: req.body.password
   });
   User.addUser(newUser,(err,user)=>{
       if(err){
           res.json({json:false, msg:"failed to register user"});
       }
       else{
           res.json({json:true, msg:"Success"});
       }

   })
});

//Authenticate
router.get('/authenticate',(req,res,next) => {
    res.send("AUTHENTICATE")
 });

 //profile
router.get('/profile',(req,res,next)=>{
    res.send("Profile")
});

module.exports = router;
