require("./config/config");

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

const port = process.env.PORT;

app
  .use(function(request, response, next) { // configuration of headers
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type, x-auth");
    response.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT")
    next();
  })
  .use(bodyParser.json())
  .use("/api", () => {console.log("hi")})
  .listen(port, () => {
    console.log(`started on port ${port}`);
  });