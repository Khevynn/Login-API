const express = require('express');
const router = express.Router();
const User = require('../models/usersModels');

router.post("/login", async function(req,res,next){
    try{
        let user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        let result = await User.Login(user);
        res.status(result.status).send(result.result);
    }catch(err){
        console.log("Error in login: ", err);
        res.status(500).send(err);
    }
});

router.post("/register", async function(req,res,next){
    try{
        let user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        let result = await User.Register(user);
        res.status(result.status).send(result.result);
    }catch(err){
        console.log("Error on register: ", err);
        res.status(500).send(err);
    }
});

module.exports = router;