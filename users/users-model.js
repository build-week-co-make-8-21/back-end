const db = require("../data/db-config");

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
    remove
};

function find() {
    return db("users")
        .select("userId", "username")
        .orderBy("userId");
};

function findBy(filter) {
    return db("users")
      .where(filter)
      .select("users.userId", "users.username", "users.password")
      .orderBy("users.userId")
  };

function findById(id) {
    return db("users")
        .where({ userId: id })
        .first();
};

async function add(user) {
    try {
        const [id] = await db("users")
            .insert(user, "userId");
            return findById(id);
    } catch (error) {
        throw error;
    }
};

function update(changes, id) {
    return db("users")
        .where({ userId: id })
        .update(changes)
        .then(() => {
            return findById(id);
        })
};

function remove(id) {
    return db("users")
        .where({ userId: id })
        .del()
};