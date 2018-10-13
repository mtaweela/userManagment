const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

// instance methods

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token
    });
};

// model methods

UserSchema.pre('save', function (next) {
    let user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });
    }else {
        next();
    }
});


let User = mongoose.model('User', UserSchema);

module.exports = {User};
