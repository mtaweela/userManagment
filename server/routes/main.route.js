var express = require("express");
var server = express.Router();

var usersRoute = require('./users.route');

server
  .use('/users', usersRoute)

module.exports = server;