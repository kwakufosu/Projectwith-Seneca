import { Note } from "@notes/model/notesModel";
import SENECA = require("seneca");
require("@notes/db/db");

let notesPlugin = function (this: SENECA.Instance, _: any) {
  this.add(
    { area: "note", action: "fetch" },
    async (args, done: (arg0: Error | null, arg1: Object | null) => void) => {
      try {
        let notes = await Note.find();
        done(null, notes);
      } catch (e: any) {
        done(e, null);
      }
    }
  );

  this.add(
    { area: "note", action: "create" },
    async (args, done: (arg0: Error | null, arg1: Object | null) => void) => {
      try {
        let note = new Note({ ...args.args.body });
        await note.save();
        done(null, note);
      } catch (e: any) {
        done(e, null);
      }
    }
  );
};

export { notesPlugin };
