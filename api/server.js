const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/users-router.js');
const issuesRouter = require('../issues/issues-router.js');
const categoriesRouter = require('../categories/categories-router');
const authRouter = require('../auth/auth-router.js');
const authMiddleware = require('../auth/auth-middleware.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/users', authMiddleware, usersRouter);
server.use('/api/issues', authMiddleware, issuesRouter);
server.use('/api/categories', authMiddleware, categoriesRouter);
server.use('/', authRouter);

server.get('/', (req, res) => {
    res.json({ server: "up and running, please navigate to a proper endpoint and login" })
});

module.exports = server;