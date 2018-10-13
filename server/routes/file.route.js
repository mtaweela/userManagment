var express = require("express");
const fileUpload = require('express-fileupload');

var router = express.Router();


var fileController = require('../controllers/files.controller');
let {authenticate} = require('./../middleware/authenticate.middleware');

router
    .use(fileUpload({
        limits: { fileSize: 300 * 1024 },
        abortOnLimit:true
    }))
    .post("/", authenticate,fileController.upload);


module.exports = router;
