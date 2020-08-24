
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {categoryId: 1, categoryName: 'Yard and Lawn'},
        {categoryId: 2, categoryName: 'Community Activities'},
        {categoryId: 3, categoryName: 'Safety'}
      ]);
    });
};
