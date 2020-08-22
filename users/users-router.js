const router = require('express').Router();

const Users = require("./users-model");

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ data: users });
        })
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const { userId } = req.params;

    Users.findById(userId)
        .then(user => {
            if(user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Could not find user with specified id.' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get user by specified id' });
        });
});

module.exports = router;