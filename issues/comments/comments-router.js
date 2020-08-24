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

router.get('/:id', validCommentId, (req, res) => {
    const id = req.params.id;

    Comments.findById(id)
        .then(comment => {
            res.status(200).json(comment);
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while retrieving this comment", error: error.message });
        });
});

router.put('/:id', validCommentId, (req, res) => {
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

router.delete('/:id', validCommentId, (req, res) => {
    const id = req.params.id;

    Comments.remove(id)
        .then(response => {
            res.status(205).json({ message: response });
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while removing this comment", error: error.message });
        });
});

function validCommentId(req, res, next) {
    Comments.findById(req.params.id)
        .then(comment => {
            if(comment) {
                next();
            }
            else {
                res.status(404).json({ message: "Could not find this comment, please make sure this is a valid comment id" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while retreiving this comment", error: error.message });
        });
};

module.exports = router;