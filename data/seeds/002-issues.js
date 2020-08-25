
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {issueId: 1, title: 'Yard sale', description: "Please make sure your yard sale is only on your own lawn. We have noticed yard sales getting out of control.", imageURL: null, categoryId: 1, username: 'hailey'},
        {issueId: 2, title: 'Block Party BBQ', description: "We'd like to invite everyone to our backyard at 12pm Saturday 8/22 for a BBQ!", imageURL: null, categoryId: 2, username: 'test'},
        {issueId: 3, title: 'Trim your sidewalk plants', description: "Please keep the trees, shrubs, and plants on your sidewalk trimmed neatly so that runners are not tripping, thanks!", imageURL: null, categoryId: 1, username: 'dominique'}
      ]);
    });
};
