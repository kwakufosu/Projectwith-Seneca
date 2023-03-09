import { notesPlugin } from "./controller/notesController";

require("seneca").use(notesPlugin).listen({ port: 4000, pin:"area: note"});
