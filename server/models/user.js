const mongoose = require('mongoose');
const validator = require('validator');

let UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: 'string',
        require: true,
        minlength: 6
    },
    firstName: {
        type: String,
        require: true,
        minlength: 1
    },
    lastName: {
        type: String, 
        require: true,
        minlength: 1
    },
    avatar: {
        type: String,
        minlength: 1
    },
    tokens: [{
        access: {
            type: 'string',
            required: true
        },
        token: {
            type: 'string',
            required: true
        }
    }]
})


let User = mongoose.model('User', UserSchema);

module.exports = {User};