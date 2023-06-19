"use strict";
const {Users} = require('../models/index');
const bcrypt = require('bcrypt');
const base64=require('base-64');


async function basicAuth(req,res,next){
    if(req.headers.authorization){
    let header=req.headers.authorization.split(" ")
    let encoded=header.pop();
    let decoded=base64.decode(encoded)
    let [username,password]=decoded.split(":")

    const user = await Users.findOne({where:{username:username}})
    const valid = await bcrypt.compare(password, user.password)

    if(valid){
        res.status(201).json({user})
        next();
     }else{
         res.status(500).send("wrong username or password")
     }}else {  
         console.log("no username or pass")
     }}
     
     
     module.exports = basicAuth;