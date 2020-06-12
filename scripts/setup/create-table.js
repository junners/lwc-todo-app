const pgdb = require("./../../src/common/pg-facade.js").pg_facade;

const tableName = "todo";

const drop_table = `DROP TABLE IF EXISTS ${tableName};`;

const tableSQL = `CREATE TABLE ${tableName} (
  content character varying(255),
  id uuid NOT NULL DEFAULT uuid_generate_v4 (),
  isdone boolean,
  title character varying(80),
  isdeleted boolean,
  sequence SERIAL,
  constraint todo_pkey PRIMARY KEY (id)
);`;

const uuid_module = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
const preloaded = `
  INSERT INTO ${tableName} (title, content)
  VALUES 
  ('Initialize Server', 'Setup node, express, postgresql to connect with lwc'),
  ('npx lwc app', 'modify npx create-lwc-app scripts to handle server initialization'),
  ('Create crud functionality','create crud functionality for creating items within the application');`;

const sqlCommands = [drop_table, uuid_module, tableSQL, preloaded];
const setupQuery = sqlCommands.join(" ");

console.log("SQL Commands", setupQuery);

const createTable = (callback) => {
  // does this throw an exception?
  pgdb(async (client) => {
    console.log("pg client ", client);
    if (!client) {
      console.log("client undefined", client);
      callback(new Error("client undefined"), null);
    }

    try {
      let res = await client.query(setupQuery);
      console.log("setup database", res);
      client.release();
      callback(null, "client released");
    } catch (err) {
      callback(new Error(err), null);
    }
  });
};

exports.createTable = createTable;
