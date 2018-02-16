const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const config = require("../config/database");

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type: String,
        require:true
    }
});

const User = module.exports = mongoose.model("User",userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}
module.exports.getUserByUsername = function(username, callback){
    const query = {username:username}
    User.findOne(query, callback);
}
module.exports.addUser= function(newUser, callback){
    bcryptjs.genSalt(10,(err,salt) => {
        bcryptjs.hash(newUser.password,salt, (err,hash)=>{
            if(err) throw err;            
            newUser.password = hash;
            newUser.save(callback);

        });
    })

}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcryptjs.compare(candidatePassword, hash,(err,isMatch)=>{
      if(err) throw err;
      callback(null, isMatch)
    });

}