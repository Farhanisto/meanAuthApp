const express = require('express');
const router = express.Router();

//Register Route
router.get('/register',(req,res,next) => {
   res.send("Register route")
});

//Authenticate
router.get('/authenticate',(req,res,next) => {
    res.send("AUTHENTICATE")
 });

 //profile
router.get('/profile',(req,res,next)=>{
    res.send("Profile")
});

//validate
router.get('/validate',(req,res,next)=>{
    res.send("validate")
});
module.exports = router;
