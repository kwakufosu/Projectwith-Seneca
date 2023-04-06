import { notesPlugin } from "./controller/notesController";

require("seneca").use(notesPlugin).listen({host:'172.18.0.2',  port: '4000', pin: "area: note" });
