
exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userId: 1, username: 'test', password: 'pass123', email: "test@gmail.com", phoneNumber: '323-555-5555'},
        {userId: 2, username: 'hailey', password: 'pass123', email: "hailey@gmail.com", phoneNumber: '323-555-5556'},
        {userId: 3, username: 'dominique', password: 'pass123', email: "dominique@gmail.com", phoneNumber: '323-555-5557'},
      ]);
    });
};
