var _ = require("lodash");

var { User } = require("./../models/user");


let getMe = (req, res) => {
  res.send()
};


let addUser = (req, res) => {
  var body = _.pick(req.body, ["username", "email", "password", "firstName", "lastName", "avatar"]);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(err => {
      res.status(400).send(err);
    });
};


let editUser = (req, res) => {
  res.send()
}; 


let deleteUser = (req, res) => {
  res.send()
};


let login = (req, res) => {
  res.send()
};


let logout = (req, res) => {
  res.send()
};

module.exports = {
  getMe,
  addUser,
  editUser,
  deleteUser,
  login,
  logout
};