const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "mozart",
  password: "dinugaitu",
  database: "MOZART",
  connectionLimit: 10,
});

module.exports = pool;
