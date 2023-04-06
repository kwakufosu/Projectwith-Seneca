import express from "express";
import SENECA = require("seneca");
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

let seneca: SENECA.Instance = require("seneca")()
  .use(require("seneca-web"), senecaWebConfig)
  .use(api)
  .client({host:'172.18.0.2', port: '4000', pin: "area: note" })
  .client({ host:'172.18.0.3', port:'5000', pin: "area:email" });

app.listen(PORT, () => {
  console.log("server up on " + PORT);
});
