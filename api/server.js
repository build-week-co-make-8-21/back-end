const express = require('express');

const server = express();

const usersRouter = require('../users/users-router.js');
//const issuesRouter = require('../issues/issues-router.js');
const authRouter = require('../auth/auth-router.js');

server.use(express.json());

server.use('/api/users', usersRouter);
//server.use('/api/issues', issuesRouter);
server.use('/', authRouter);


server.get('/', (req, res) => {
    res.json({ server: "up and running, please navigate to a proper endpoint and login" })
});

module.exports = server;