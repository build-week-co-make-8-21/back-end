const db = require('../../data/db-config.js');

module.exports = {
    find,
    findById,
    update,
    remove
};

function find() {
    return db('comments');
};

function findById(id) {
    return db('comments').where({ commentId: id }).first();
};

function update(changes, id) {
    return db('comments').where({ commentId: id }).update(changes)
        .then(() => {
            return findById(id);
        });
};

function remove(id) {
    return db('comments').where({ commentId: id }).del()
        .then(count => {
            if(count) {
                return "Successfully Removed";
            }
            else {
                return "ERROR";
            }
        });
};