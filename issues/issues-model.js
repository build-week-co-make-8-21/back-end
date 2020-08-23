const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    addComment,
    findCommentsFromIssue
}

function find() {
    return db('issues');
};

function findById(id) {
    return db('issues').where({ issueId: id }).first();
};

function add(issue) {
    return db('issues').insert(issue).returning('issueId')
        .then(ids => {
            return findById(ids[0]);
        });
};

function update(changes, id) {
    return db('issues').where({ issueId: id }).update(changes)
        .then(() => {
            return findById(id);
        });
};

function remove(id) {
    return db('issues').where({ issueId: id }).del()
        .then(count => {
            if(count) {
                return "Successfully Removed";
            }
            else {
                return "ERROR";
            }
        });
};

function addComment(id, comment) {
    comment.issueId = id;

    return db('comments').insert(comment).returning('commentId')
        .then(([ids]) => {
            return db('issues')
            .join('comments', 'issues.issueId', "=", 'comments.issueId')
            .select('issues.title as issueTitle', 'comments.commentId', 'comments.comment')
            .where({ 'comments.commentId': ids })
            .first();
        });
};

function findCommentsFromIssue(id) {
    return db('issues')
        .join('comments', 'issues.issueId', "=", 'comments.issueId')
        .select('issues.title as issueTitle', 'comments.commentId', 'comments.comment')
        .where({ 'issues.issueId': id })
};