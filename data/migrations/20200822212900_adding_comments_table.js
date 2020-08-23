
exports.up = function(knex) {
  return knex.schema
    .createTable('comments', tbl => {
        tbl.increments('commentId');
        tbl.string('comment').notNullable();
        tbl.integer('issueId');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments');
};
