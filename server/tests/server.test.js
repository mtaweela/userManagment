const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { User } = require("./../models/user");
const { app } = require("./../app");
const { users, populateUsers } = require("./seed/seed");

beforeEach(populateUsers);

describe("GET /users/me", () => {
  it("should return user if authenticated", done => {
    request(app)
      .get("/api/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it("should return 401 if not authenticated", done => {
    request(app)
      .get("/api/users/me")
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe("POST /users", () => {
  it("should create a user", done => {
    let email = "one@gmail.com";
    let password = "1234qwer";
    let username = "user";
    let firstName = "memeo";
    let lastName = "lastmemeoever";
    let avatar = "/hello.png";


    request(app)
      .post("/api/users")
      .send({ email, password, username, firstName, lastName, avatar})
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({ email }).then(user => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch(err => done(err));
      });
  });

  it("should return validation error if request is invalid", done => {
    request(app)
      .post("/api/users")
      .send({
        email: "mmm",
        password: "ddd"
      })
      .expect(400)
      .end(done);
  });

  it("should not create user if email in use", done => {
    request(app)
      .post("/api/users")
      .send({
        email: users[0].email,
        password: "1234wqer"
      })
      .expect(400)
      .end(done);
  });
});

describe("POST /users/login", () => {
  it("should login user and return auth token", done => {
    request(app)
      .post("/api/users/login")
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeTruthy();
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        User.findById(users[1]._id).then(user => {
          expect(user.tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });

          done();
        }).catch(err => done(err));
      });
  });

  it("should reject invalid token", done => {
    request(app)
      .post("/api/users/login")
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect(res => {
        expect(res.headers["x-auth"]).toBeFalsy();
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        User.findById(users[1]._id).then(user => {
          expect(user.tokens.length).toBe(1);

          done();
        }).catch(err => done(err));
      });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on log out', done => {
    request(app)
      .delete('/api/users/me/token')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then(user => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch(err => done(err));
      });
  });
});