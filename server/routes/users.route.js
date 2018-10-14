var express = require("express");
var router = express.Router();

var usersController = require('../controllers/users.controller');
let {authenticate} = require('./../middleware/authenticate.middleware');

router
    .post("/", usersController.addUser)
    .post("/login", usersController.login)
    .get("/me", authenticate ,usersController.getMe)
    .put('/me', authenticate, usersController.editUser)
    .delete('/me', authenticate, usersController.deleteUser)
    .delete('/me/token', authenticate, usersController.logout)

module.exports = router;
