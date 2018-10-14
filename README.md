# User Managment

This is a simple project for managing users in a node project using API end points. You could add, edit, remove users. 

The API End points are protected using JWT authenication.

Users could login to their accounts, logout, edit their information and delete it if they want.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To install the project, you need to get [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/) and [mongo](https://www.mongodb.com/) runing on your machine.

Also, if you want to run the project inside docker container, you will need to get [docker](https://www.docker.com/) and docker-compose running on your machine.

### Installing
Once you have the previous mentioned tools, you could download the source code and go to the directory containing the source code and run

```
npm install
```

After installing, you will need to add a configuration file with the name config.json inside the folder /server/config inside the project.

The file content should be something like this:

```
{
  "test": {
    "PORT": 3600,
    "MONGODB_URI": "mongodb://127.0.0.1:27017/userAppTest",
    "JWT_SECRET": "kjdi2u3b9238ge9f8gbp8qw398gv18"
  },
  "development": {
    "PORT": 3500,
    "MONGODB_URI": "mongodb://127.0.0.1:27017/userApp",
    "JWT_SECRET": "2n3i2932x8m329rx3y270xn2r730cn2"
  }
}

```
You need to change the JWT_SECRET to some random string of your own to protect your data.

After that, you could run the server simply by:
```
npm start
```

If you want the project to watch over changes you make in the code,  you will need to install nodemon gloplally by:

```
npm i -g nodemon
```
Then, run:

```
npm run start-dev
```

#### Runing inside Docker Container

To run the project inside container, You need to get docker and docker compose runing on your machine at first.

After that, you will the following configuration file inside the folder /server/config inside the project.
```
{
  "test": {
    "PORT": 3500,
    "MONGODB_URI": "mongodb://mongo:27018/userAppTest",
    "JWT_SECRET": "kjdi2u3b9238ge9f8gbp8qw398gv18"
  },
  "development": {
    "PORT": 3500,
    "MONGODB_URI": "mongodb://mongo:27018/userApp",
    "JWT_SECRET": "2n3i2932x8m329rx3y270xn2r730cn2"
  }
}

```
You need to change the JWT_SECRET to some random string of your own to protect your data.

Then, You could run the following command to get the project up and runing in its container:
```
docker-compose up
```

#### Accessing the API documentation

Now, you could access the API documentation from your browser on:
```
localhost:3500/api-docs
```
From their, you could try the different APIs and get more info about each one.


## Running the tests

To run the tests, you need to install the packaegs at first:

```
npm install
```

After that you could run the tests by:

```
npm run test
```

If you the test to run on every change you make in the files, you will need to install nodemon gloplally by:

```
npm i -g nodemon
```

After that you could run the following command to watch for changes in the files:

```
npm run test-watch
```

## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [npm](https://www.npmjs.com/) - Package manager for JavaScript and the world’s largest software registry.
* [Express](https://expressjs.com/) - Minimalist web framework for Node.js.
* [mongo](https://www.mongodb.com/) - Free and open-source cross-platform document-oriented database program.
* [mongoose](https://mongoosejs.com/) - Elegant mongodb object modeling for node.js.
* [mocha](https://mochajs.org/) - Feature-rich JavaScript test framework running on Node.js.
* [swagger](https://swagger.io/) - Aides in development across the entire API lifecycle, from design and documentation, to test and deployment.
* [docker](https://www.docker.com/) - Open platform for developers and sysadmins to build, ship, and run distributed applications.

## Authors

* **Mohamed Taweela** - *Initial work* - [mtaweela](https://github.com/mtaweela)

See also the list of [contributors](https://github.com/mtaweela/userManagment/graphs/contributors) who participated in this project.

## License

I do not know too much about the licences, So just get it and use it if you wish to :D.

## Acknowledgments

* Most of the code was obtained from tutorials made by [Andrew Mead](https://www.udemy.com/user/andrewmead/).