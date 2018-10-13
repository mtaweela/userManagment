var express = require("express");
var router = express.Router();

router
    .get("/me", (req, res) => {res.send("me")})
    .post("/", (req, res) => {res.send('root')})
    .post("/login", (req, res) => {res.send('login')})
    .delete('/me/token', (req, res) => {res.send('logout')})


module.exports = router;
