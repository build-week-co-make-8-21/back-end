const router = require('express').Router();

const Comments = require('./comments-model.js');

router.get('/', (req, res) => {
    Comments.find()
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => {
            res.status(500).json({ message: "Somthing went wrong while retrieving the comments", error: error.message });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Comments.findById(id)
        .then(comment => {
            res.status(200).json(comment);
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while retrieving this comment", error: error.message });
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Comments.update(changes, id)
        .then(comment => {
            res.status(203).json(comment);
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while editting this comment", error: error.message });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Comments.remove(id)
        .then(response => {
            res.status(205).json({ message: response });
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while removing this comment", error: error.message });
        });
});

module.exports = router;