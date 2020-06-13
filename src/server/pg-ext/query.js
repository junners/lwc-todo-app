const pgdb = require("./../../common/pg-facade.js").pg_facade;

const tableName = "todo";

const select_query = `SELECT * FROM ${tableName}`;

exports.doQuery = (callback) => {
  pgdb(async (client) => {
    // eslint-disable-next-line no-use-before-define
    await new PgAction(select_query, client).doAction(callback);
  });
};

const insert = (callback, ...parameters) => {
  const modified = parameters.map(
    (instance) => `('${instance.title}', '${instance.description}')`
  );
  const insert_statement = `INSERT INTO ${tableName}(title, content) VALUES ${modified.join(
    ","
  )} RETURNING *`;
  pgdb(async (client) => {
    // eslint-disable-next-line no-use-before-define
    await new PgAction(insert_statement, client).doAction(callback);
  });
};

const update = (callback, param) => {
  const id = param.id;
  const modified_param = { title: param.title, content: param.description };
  const formatted = Object.fromEntries(
    Object.entries(modified_param).map(([key, value]) => `${key}='${value}'`)
  );
  const update_statement = `UPDATE ${tableName} SET ${formatted.join(
    ","
  )} WHERE id = '${id}'`;
  pgdb(async (client) => {
    // eslint-disable-next-line no-use-before-define
    await new PgAction(update_statement, client).doAction(callback);
  });
};

exports.save = insert;
exports.update = update;

class PgAction {
  action;
  client;
  constructor(action, client) {
    this.action = action;
    this.client = client;
  }

  async doAction(callback) {
    try {
      const res = await this.client.query(this.action);
      callback(null, res);
    } catch (err) {
      callback(err, null);
    }
  }
}
