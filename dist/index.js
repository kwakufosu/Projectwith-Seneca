"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SenecaWeb = require("seneca-web");
const notesController_1 = require("./services/notes/controller/notesController");
const service_integration_1 = require("./service_integration");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
let senecaWebConfig = {
    context: app,
    adapter: require("seneca-web-adapter-express"),
    options: { parseBody: false },
};
let seneca = require("seneca")()
    .use(SenecaWeb, senecaWebConfig)
    .use(notesController_1.notesPlugin)
    .use(service_integration_1.api);
app.listen(PORT, () => {
    console.log("server up on " + PORT);
});
