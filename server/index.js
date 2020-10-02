"use strict";

const express = require("./node_modules/express");
const bodyParser = require("./node_modules/body-parser");
const morgan = require("./node_modules/morgan");
const http = require("http");
const path = require("path");
const _ = require("./node_modules/lodash");

require("dotenv").config();

const { createHaikuDB, getAllHaikus } = require(path.join(
  __dirname,
  "./haikuHandlers"
));

const PORT = process.env.PORT || 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "../../client/build"))

  //Create a Haiku DataBase

  .post("/createHaikus", createHaikuDB)

  //testing endpoints

  .get("/allHaikus/:id", getAllHaikus)

  .get("path", (req, res) => {
    res.sendFile(path.join(__dirname + "../../client/build/index.html"));
  })

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
