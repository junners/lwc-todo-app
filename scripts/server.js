// Simple Express server setup to serve the build output
const compression = require("compression");
const helmet = require("helmet");
const express = require("express");
const path = require("path");
const serverSetup = require("./setup/create-table.js");
require("dotenv").config();

const app = express();
app.use(helmet());
app.use(compression());

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3001;
const DIST_DIR = "./dist";

app.use(express.static(DIST_DIR));

app.use("*", (req, res) => {
  res.sendFile(path.resolve(DIST_DIR, "index.html"));
});

app.on("done", () => {
  app.listen(PORT, () =>
    console.log(`✅  Server started: http://${HOST}:${PORT}`)
  );
});

serverSetup.createTable((err, data) => {
  if (err) {
    console.log("Error from create table", err);
    process.exit(1);
  }
  if (data) {
    app.emit("done");
  }
});
