const router = require('express').Router();

const Users = require("./users-model");

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong while retrieving the users", err: err.message }) 
        }); 
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "Could not find user with specified id." })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get user by specified id", err: err.message });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findById(id)
        .then(user => {
            if(user) {
                Users.update(changes, id)
                    .then(user => {
                        res.status(200).json(user)
                    })
            } else {
                res.status(404).json({ message: "Could not find the specified user" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to update user", err: err.message})
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(200).json({ Removed: `user with id: ${id}`})
            } else {
                res.status(404).json({ message: "Could not find user with specified id" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong while trying to remove the user", err: err.message });
        })
});

module.exports = router;