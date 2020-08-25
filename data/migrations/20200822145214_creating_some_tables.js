
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments('userId');
        tbl.string('username', 100).notNullable().unique();
        tbl.string('password', 100).notNullable();
        tbl.string('email', 100).notNullable().unique();
        tbl.string('phoneNumber').unique();
    })
    .createTable('issues', tbl => {
        tbl.increments('issueId');
        tbl.string('title', 200).notNullable();
        tbl.string('description', 500).notNullable();
        tbl.string('imageURL');
        tbl.integer('categoryId');
        tbl.string('username')
            .notNullable()
            .references('username')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    })
    .createTable('categories', tbl => {
        tbl.increments('categoryId');
        tbl.string('categoryName', 100).notNullable().unique();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('categories')
    .dropTableIfExists('issues')
    .dropTableIfExists('users');
};
