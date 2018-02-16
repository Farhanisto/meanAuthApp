const express = require('express');
const router = express.Router();
const User = require("../models/users");
const config =require("../config/database")
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
router.post('/authenticate',(req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg: "User not Found"});
        }
        User.comparePassword(password, user.password, (err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret, {
                    expiresIn:60800,
                })
                res.json({
                    success: true,
                    token: 'JWT '+ token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username:user.username,
                        email: user.email
                    }
                    
                })
            }else{
                return res.json({success:false, msg: "wrong password"})
            }

        })

    })
 });

 //profile
router.get('/profile',(req,res,next)=>{
    res.send("Profile")
});

module.exports = router;
