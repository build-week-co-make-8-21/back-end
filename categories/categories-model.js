const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findIssuesByCategory
};

function find() {
    return db("categories")
        .select("categoryId", "categoryName")
        .orderBy("categoryId")
};

function findById(id) {
    return db("categories")
        .where({ categoryId: id })    
        .first();
};

// async function add(category) {
//     try {
//         const [id] = await db("categories")
//             .insert(category, "categoryId")
//             return findById(id)
//     } catch (error) {
//         throw error;
//     }
// };

function add(category) {
    return db("categories")
        .insert(category)
        .returning("categoryName")
        .then(ids => {
            return findById(ids[0]);
        });
};

function update(changes, id) {
    return db("categories")
        .where({ categoryId: id })
        .update(changes)
        .then(() => {
            return findById(id);
        })
};

function remove(id) {
    return db("categories")
        .where({ categoryId: id })
        .del()
};

function findIssuesByCategory(id) {
    return db("categories")
        .join("issues", "categories.categoryId", "=", "issues.categoryId")
        .select("categories.categoryName", "issues.issueId", "issues.title", "issues.description", "issues.imageURL", "issues.username")
        .where({ "categories.categoryId": id })
};