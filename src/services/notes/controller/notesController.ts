import { Note } from "../model/notesModel";

require("../db/db");

let notesPlugin = function (this: any, options: any) {
  this.add(
    { area: "note", action: "fetch" },
    async (
      args: any,
      done: (arg0: Error | null, arg1: Object | null) => void
    ) => {
      try {
        let notes = await Note.find();
        done(null, notes);
      } catch (e: any) {
        done(Error(e), null);
      }
    }
  );

  this.add(
    { area: "note", action: "create" },
    async (
      args: any,
      done: (arg0: Error | null, arg1: Object | null) => void
    ) => {
      try {
        let note = new Note({ ...args.args.body });
        await note.save();
        done(null, note);
      } catch (e: any) {
        done(Error(e), null);
      }
    }
  );
};

export { notesPlugin };
