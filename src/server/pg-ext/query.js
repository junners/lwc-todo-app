const Pool = require("pg").Pool;
require("dotenv").config();
const { DB_USER, DB_HOST, DB_NAME, DB_PW, DB_PORT } = process.env;

const connectionPool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PW,
  port: DB_PORT
});

const tableName = "todo";

const select_query = `SELECT * FROM ${tableName}`;

exports.doQuery = async (callback) => {
  const client = await connectionPool.connect();
  // once connected we query
  const res = await client.query(select_query);
  console.log(res);
  client.release();
  callback(null, res);
};
