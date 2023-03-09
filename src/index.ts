import express from "express";
const SenecaWeb = require("seneca-web");

import { notesPlugin } from "./services/notes/controller/notesController";
import { api } from "./service_integration";
import { emailPlugin } from "./services/email/email";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let senecaWebConfig = {
  context: app,
  adapter: require("seneca-web-adapter-express"),
  options: { parseBody: false },
};

let seneca = require("seneca")()
  .use(SenecaWeb, senecaWebConfig)
  .use(notesPlugin)

  .use(api);

app.listen(PORT, () => {
  console.log("server up on " + PORT);
});
