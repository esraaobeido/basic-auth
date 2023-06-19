"use strict";

const bcrypt = require("bcrypt");
const express = require("express");
const { Users } = require("../auth/models/index");
const basicAuth = require("../auth/middleware/basic");

const userRouter = express.Router();


userRouter.post("/signup", signUp);
userRouter.post("/signin", basicAuth , signIn);
userRouter.get("/users", allUsers);

async function signUp(req, res) {
    let username = req.body.username
    let hashedPassword = await bcrypt.hash(req.body.password,5)
    const record = await Users.create({
        username:username,
        password:hashedPassword
    })
    res.status(201).json(record)
  }
  
  function signIn(req, res) {
    res.status(200).json(req.user);
  }

  async function allUsers (req, res){
    const allUsers = await Users.findAll();
    res.status(200).json(allUsers);
}
  module.exports = userRouter;