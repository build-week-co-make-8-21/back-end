const knex = require("knex");

const knexfile = require("../knexfile.js");
const environment = "development" || process.env.NODE_ENV;

module.exports = knex(knexfile[environment]);