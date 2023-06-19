"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


const notFound = require("./middleware/404");
const errorHandler = require("./middleware/500");
const router =require('./auth/router')

app.use(express.json());
app.use(router)

app.get("/", welcomeHandler);
function welcomeHandler(req, res) {
  res.status(200).send("hi");
}

function start() {
  app.listen(port, () => {
    console.log(`server is up and listen on ${port}`);
  });
}

app.use("*", notFound);
app.use(errorHandler);

module.exports = {
  start: start,
  app: app,
};