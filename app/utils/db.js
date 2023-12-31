const mariadb = require("mariadb");

export const masterDatabasePool = mariadb.createPool({
  host: "localhost",
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  connectionLimit: 10,
});
