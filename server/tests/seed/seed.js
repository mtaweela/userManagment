const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const { User } = require("./../../models/user");


const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
    {
        _id: userOneId,
        email: 'mm@gmail.com',
        password: 'userOnePass',
        username: "user1",
        firstName: "mohamed",
        lastName: "taweela",
        avatar: "/hello.png",
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'nn@gmail.com',
        password: 'userTwoPass',
        username: "user2",
        firstName: "mohamed",
        lastName: "taweela",
        avatar: "/hello.png",
        tokens: [{
            access: 'auth',
            token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }]
    }
]

const populateUsers = done => {
    User.remove({})
        .then(() => {
            let userOne = new User(users[0]).save();
            let userTwo = new User(users[1]).save();

            return Promise.all([userOne, userTwo])
        })
        .then(() => done());
}

module.exports = {users, populateUsers}