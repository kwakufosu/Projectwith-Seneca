import express from "express";
const SenecaWeb = require("seneca-web");

import { api } from "./services-API";

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
  .use(api)
  .client({ port: 4000, pin: "area: note" });

app.listen(PORT, () => {
  console.log("server up on " + PORT);
});
