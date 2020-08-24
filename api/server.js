const express = require('express');
const helmet = require('helmet');

const server = express();

const usersRouter = require('../users/users-router.js');
const issuesRouter = require('../issues/issues-router.js');
const authRouter = require('../auth/auth-router.js');
const protected = require('../auth/auth-middleware.js');

server.use(express.json());
server.user(helmet());

server.use('/api/users', protected, usersRouter);
server.use('/api/issues', protected, issuesRouter);
server.use('/', authRouter);


server.get('/', (req, res) => {
    res.json({ server: "up and running, please navigate to a proper endpoint and login" })
});

module.exports = server;