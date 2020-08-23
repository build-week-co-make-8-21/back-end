const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require("../users/users-model");
const { isValid } = require('../users/users-service');

const db = require('../data/db-config.js');
const signToken = require('./signToken.js');

router.post('/signup', (req, res) => {
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
            if(user && bcrypt.compareSync(loginInfo.password, user.password)) {
                const token = signToken(user);

                res.status(200).json({ message: `Welcome, ${loginInfo.username}`, token: token})
            }
            else {
                res.status(401).json({ message: "Incorrect login" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while trying to log you in", error: error.message });
        })
});

module.exports = router;