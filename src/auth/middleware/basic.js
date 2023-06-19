"use strict";
const {Users} = require('../models/index');
const bcrypt = require('bcrypt');
const base64=require('base-64');
const e = require('express');


async function basicAuth(req,res,next){
    if(req.headers.authorization){
        let header=req.headers.authorization.split(" ")
        let encoded=header.pop();
        let decoded=base64.decode(encoded)
        let [username,password]=decoded.split(":")

        const user = await Users.findOne({where:{username:username}})
        
        if(!user){
            res.status(404).json("no username")
        }
        const valid = await bcrypt.compare(password, user.password)
        if(valid){     
            res.status(201).json({user})
            next();
        }else{
            res.status(500).send("wrong username or password")
        }

    }

}

     
module.exports = basicAuth;