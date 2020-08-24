require('dotenv').config();

const pg = process.env.DB_ENV || "postgresql://postgres@localhost/dbCoMake";

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/dbCoMake.db3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  production: {
    client: 'pg',
    connection: pg,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  }

};
