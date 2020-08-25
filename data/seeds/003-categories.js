
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {categoryId: 1, categoryName: 'Yard and Lawn'},
        {categoryId: 2, categoryName: 'Community Activities'},
        {categoryId: 3, categoryName: 'Crime & Safety'},
        {categoryId: 4, categoryName: 'Lost & Found'},
        {categoryId: 5, categoryName: 'Recommendations'},
        {categoryId: 6, categoryName: 'Flooding'},
        {categoryId: 7, categoryName: 'General'},
        {categoryId: 8, categoryName: 'Announcements'},
        {categoryId: 9, categoryName: 'Pets'},
        {categoryId: 10, categoryName: 'Road Closures & Transportation'},
        {categoryId: 11, categoryName: 'School & Education'},
        {categoryId: 12, categoryName: 'Holiday'},
        {categoryId: 13, categoryName: 'Utilities'},
      ]);
    });
};
