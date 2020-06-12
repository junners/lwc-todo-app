const Pool = require("pg").Pool;
require("dotenv").config();

let connectionPool;

// eslint-disable-next-line no-undef
exports.pg_facade = async function (callback) {
  if (connectionPool) {
    callback(connectionPool);
    return;
  }

  // eslint-disable-next-line no-undef
  const { DB_USER, DB_HOST, DB_NAME, DB_PW, DB_PORT } = process.env;

  const pgpool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PW,
    port: DB_PORT
  });

  const client = await pgpool.connect();
  connectionPool = client;
  callback(connectionPool);
};
