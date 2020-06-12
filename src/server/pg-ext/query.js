const pgdb = require("./../../common/pg-facade.js").pg_facade;

const tableName = "todo";

const select_query = `SELECT * FROM ${tableName}`;

exports.doQuery = (callback) => {
  pgdb(async (client) => {
    // once connected we query
    const res = await client.query(select_query);
    console.log(res);
    callback(null, res);
  });
};
