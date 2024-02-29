const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "mozart",
  password: "dinugaitu",
  database: "MOZART",
  connectionLimit: 50,
  timeout: 6000000
});

module.exports = pool;
