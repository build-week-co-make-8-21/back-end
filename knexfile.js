require('dotenv').config();

const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/dbCoMake";

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
    client: 'sqlite3',
    connection: {
      filename: './data/prodDbCoMake.db3'
    },
    // in video, he did client pg, connection:pgConnection
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/testdb.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  }

};
