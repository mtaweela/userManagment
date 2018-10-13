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

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', "username", "email", "firstName", "lastName", "avatar"]);
};

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token
    });
};

UserSchema.methods.removeToken = function(token) {
    let user = this;

    return user.update({
        $pull:{
            tokens: {token}
        }
    })
};

// model methods

UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;
    
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch (err) {
        return Promise.reject();
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

UserSchema.statics.findByCredintials = function(email, password) {
    var User = this;

    return User.findOne({email}).then(user => {
        if(!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        })
    })
}

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
