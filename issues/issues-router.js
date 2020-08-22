const router = require('express').Router();

const Issues = require('./issues-model.js');

router.get('/', (req, res) => {
    Issues.find()
        .then(issues => {
            res.status(200).json(issues)
        })
        .catch(error => {
            res.status(500).json({ error: "Something went wrong while retrieving the issues", error: error.message });
        });
});

router.post('/', (req, res) => {
    const issue = req.body;

    Issues.add(issue)
        .then(issue => {
            res.status(201).json(issue);
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while posting this issue", error: error.message });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Issues.findById(id)
        .then(issue => {
            res.status(200).json(issue);
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while retrieving this issue", error: error.message});
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Issues.update(changes, id)
        .then(issue => {
            res.status(203).json(issue);
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while updating this issue", error: error.message });
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Issues.remove(id)
        .then(stat => {
            res.status(205).json(stat);
        })
        .catch(error => {
            res.status(500).json({ message: "Something went wrong while removing this issue", error: error.message });
        })
})

module.exports = router;