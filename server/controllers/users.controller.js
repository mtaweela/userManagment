var _ = require("lodash");

var { User } = require("./../models/user");


let getMe = (req, res) => {
  res.send(req.user);
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
  req.user.update(req.body)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(400).send();
    });
};


let deleteUser = (req, res) => {
  req.user.remove()
  .then(() => {
    res.status(200).send();
  })
  .catch(err => {
    res.status(400).send();
  });
};


let login = (req, res) => {
  let body = _.pick(req.body, ["email", "password"]);

  User.findByCredintials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(err => {
      res.status(400).send();
    });
};


let logout = (req, res) => {
  req.user
    .removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      res.staus(400).send();
    });
};


module.exports = {
  getMe,
  addUser,
  editUser,
  deleteUser,
  login,
  logout
};