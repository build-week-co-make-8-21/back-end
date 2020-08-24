
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {commentId: 1, comment: 'Good point, this will help keep the yard sales under control', issueId: 1},
        {commentId: 2, comment: 'How fun! We will be there.', issueId: 2},
        {commentId: 3, comment: 'Lovely! I will bring cole slaw and homemade cookies.', issueId: 2},
        {commentId: 4, comment: 'Thanks for mentioning this, my son tripped the other day.', issueId: 3}
      ]);
    });
};
