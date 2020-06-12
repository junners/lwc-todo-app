// Simple Express server setup to serve for local testing/dev API server
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const query = require("./pg-ext/query.js");

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || "localhost";
const PORT = process.env.API_PORT || 3002;

app.get("/api/v1/todos", (req, res) => {
  query.doQuery((err, r2) => {
    if (err) res.json({ err });
    res.json(
      r2.rows.map((row) => {
        return {
          title: row.title,
          description: row.content,
          id: row.id,
          sequence: row.sequence
        };
      })
    );
  });
});

app.listen(PORT, () =>
  console.log(`✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`)
);
