const Pool = require('pg').Pool;

const { DB_USER, DB_HOST, DB_NAME, DB_PW, DB_PORT } = process.env;

const connectionPool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PW,
    port: DB_PORT
});

const tableName = 'todo';

const tableSQL = `CREATE TABLE ${tableName} (
  content character varying(255)[],
  id uuid NOT NULL,
  isdone boolean,
  title character varying(255),
  isdeleted boolean,
  constraint todo_pkey PRIMARY KEY (id)
);`;

const createTable = async (callback) => {
    // does this throw an exception?
    const client = await connectionPool.connect();
    if (!client) {
        console.log('client undefined', client);
        //process.exit(1);
        callback(new Error('client undefined'), null);
    }

    await client.query(`DROP TABLE IF EXISTS ${tableName};`, (err, res) => {
        if (err) {
            console.log('DROP Table error ', err);
            //process.exit(1);
            callback(new Error('DROP Table error'), null);
        }
        if (res) {
            console.log('Existing table dropped ', res);
        }
    });

    await client.query(tableSQL, (err, res) => {
        if (err) {
            console.log('Create table error ', err);
            // process.Pexit(1);
            callback(new Error('Create table error'), null);
        }
        if (res) {
            console.log('Create table success ', res);
        }

        client.release();
        callback(null, 'client released');
    });
};

exports.createTable = createTable;
