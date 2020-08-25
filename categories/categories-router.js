const router = require('express').Router();

const Categories = require('./categories-model');
const issuesRouter = require('../issues/issues-router');

router.use('./issues', issuesRouter);

router.get('/', (req, res) => {
    Categories.find()
        .then(categories => {
            res.status(200).json(categories);
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving the categories", err: err.message })
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Categories.findById(id)
        .then(category => {
            if(category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: "Could not find category with specified id"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get category by specified id", err: err.message})
        })
});

router.post('/', (req, res) => {
    const category = req.body;

    Categories.add(category)
        .then(category => {
            res.status(201).json(category);
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong while posting this category", err:err.message });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Categories.update(changes, id)
        .then(updated => {
            res.status(200).json({message: "Category updated successfully", updated})
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong while updating this category", err:err.message });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Categories.remove(id)
        .then(deleted => {
            if(deleted) {
                res.status(200).json({ Removed: `category ${id}`})
            } else {
                res.status(404).json({ message: "Could not find category with specified id"})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong while trying to remove the category", err: err.message});
        });
});

router.get('/:id/issues', (req, res) => {
    const { id } = req.params;

    Categories.findIssuesByCategory(id)
        .then(issues => {
            res.status(200).json(issues);
        })
        .catch(err => {
            res.status(500).json({ message: "Could not find issues under specified category"});
        });
});

module.exports = router;