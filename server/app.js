require("./config/config");
require("./db/mongoose");
let swaggerUi = require("swagger-ui-express");

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

const port = process.env.PORT;
let swaggerDocument = require("./swagger.json");
var mainRouter = require("./routes/main.route");

app
  .use(function(req, res, next) { // configuration of headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-auth");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT")
    next();
  })
  .use('/static', express.static(__dirname + '/public'))
  .use(bodyParser.json())
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use("/api", mainRouter)
  .listen(port, () => {
    console.log(`started on port ${port}`);
  });

module.exports = { app };
