var express = require("express");
var router = express.Router();

var usersController = require('../controllers/users.controller');
let {authenticate} = require('./../middleware/authenticate.middleware');

router
    .get("/me", authenticate ,usersController.getMe)
    .post("/", usersController.addUser)
    .put('/me', authenticate, usersController.editUser)
    .delete('/me', authenticate, usersController.deleteUser)
    .post("/login", usersController.login)
    .delete('/me/token', authenticate, usersController.logout)

module.exports = router;
