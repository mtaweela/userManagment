var express = require("express");
var server = express.Router();

var usersRoute = require('./users.route');
var fileRoute = require('./file.route');

server
  .use('/users', usersRoute)
  .use('/upload', fileRoute)

module.exports = server;