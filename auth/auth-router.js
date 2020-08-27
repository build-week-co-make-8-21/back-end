const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require("../users/users-model");
const { isValid } = require('../users/users-service');

const db = require('../data/db-config.js');
const signToken = require('./signToken.js');

router.post('/signup', validateUser, doesUserExist, (req, res) => {
    const userInfo = req.body;

    if(isValid(userInfo)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcrypt.hashSync(userInfo.password, rounds);
        
        userInfo.password = hash;

        Users.add(userInfo)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: "Something went wrong while trying to create your user", error: error.message })
            });
    } else {
        res.status(400).json({ message: "Please provide a username and password"});
    }
});

router.post('/login', (req, res) => {
    const loginInfo = req.body;


    db('users').where({ username: loginInfo.username }).first()
        .then(user => {
            if(user && bcrypt.compareSync(loginInfo.password, user.password) || loginInfo.password === user.password) {
                const token = signToken(user);

                res.status(200).json({ message: `Welcome, ${user.username}`, token: token})
            }
            else {
                res.status(401).json({ message: "Username/Email and/or password incorrect" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while trying to log you in", error: error.message });
        })
});

function validateUser(req, res, next) {
    if(req.body.username === undefined || req.body.email === undefined) {
        res.status(400).json({ message: "Username/Email missing" });
    }
    else if(req.body.password === undefined) {
        res.status(400).json({ message: "Please enter a password" });
    }
    else {
        next();
    }
};

function doesUserExist(req, res, next) {
    const username = req.body.username;

    db('users').where({ username }).first()
        .then(user => {
            if(user) {
                res.status(401).json({ message: `The username ${username} is taken, please login with this account or signin` });
            }
            else {
                next();
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while adding this user", error: error.message });
        });
};

module.exports = router;