var express = require("express");
var router = express.Router();

var usersController = require('../controllers/users.controller');

router
    .get("/me", usersController.getMe)
    .post("/", usersController.addUser)
    .put('/me', usersController.editUser)
    .delete('/me', usersController.deleteUser)
    .post("/login", usersController.login)
    .delete('/me/token', usersController.logout)

module.exports = router;
