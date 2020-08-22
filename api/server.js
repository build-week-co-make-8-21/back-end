const express = require('express');

const server = express();

const issuesRouter = require('../issues/issues-router.js');
const authRouter = require('../auth/auth-router.js');
const protected = require('../auth/auth-middleware.js');

server.use(express.json());

server.use('/api/issues', protected, issuesRouter);
server.use('/', authRouter);
const usersRouter = require('../users/users-router.js');
server.use('/api/users', usersRouter);


server.get('/', (req, res) => {
    res.json({ server: "up and running, please navigate to a proper endpoint and login" })
});

module.exports = server;