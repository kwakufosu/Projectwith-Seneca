import { Note } from "../model/notesModel";
import seneca from "seneca";
require("../db/db");

const sen = seneca();

/*
let plugin = function (this: any, options: any) {
  let sen = this;
  sen.add(
    { area: "note", action: "fetch" },
    async (
      args: any,
      done: (arg0: Error | null, arg1: Object | null) => void
    ) => {
      
      let notes = await Note.find();
      if (notes) done(null, notes);
      done(Error("An error occured"), null);
    }
  );
};
*/
sen.add(
  { area: "note", action: "fetch" },
  async (
    args: any,
    done: (arg0: Error | null, arg1: Object | null) => void
  ) => {
    let notes = await Note.find();
    console.log(notes);
    if (notes) {
      done(null, notes);
    }
    done(Error("An error occured"), null);
  }
);

sen.add(
  { area: "note", action: "create" },
  async (
    args: any,
    done: (arg0: Error | null, arg1: Object | null) => void
  ) => {
    let note = new Note({
      ...args.note,
    });

    try {
      await note.save();
      done(null, note);
    } catch (e: any) {
      done(Error(e), null);
    }
  }
);

sen.act(
  { area: "note", action: "create", note: { note: "I am the one" } },
  function (err, result) {
    if (err) {
      return console.error(err);
    }
    console.log(result);
  }
);



//export { plugin as notesPlugin };
