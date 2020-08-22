
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userId: 1, username: 'test', password: 'pass123'},
      ]);
    });
};
