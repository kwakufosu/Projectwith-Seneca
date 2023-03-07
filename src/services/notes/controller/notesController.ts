import { Note } from "../model/notesModel";
import seneca from "seneca";
require("../db/db");

const sen = seneca();

let notesPlugin = function (this: any, options: any) {
  let sen = this;
  sen.add(
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

  this.add("init:notesPlugin", function (msg: any, respond: any) {
    sen.act(
      "role:web",
      {
        routes: {
          prefix: "/note",
          pin: "area:note, action:*",
          map: {
            fetch: { GET: true },
            create: { GET: false, POST: true },
          },
        },
      },
      respond
    );
  });
};

export { notesPlugin };

/*
====This code was just to test the microservice before structuring as a plugin======
sen.act(
  { area: "note", action: "create", note: { note: "I am the one" } },
  function (err, result) {
    if (err) {
      return console.error(err);
    }
    console.log(result);
  }
);

sen.act({ area: "note", action: "fetch" }, function (err, result) {
  if (err) {
    return console.error(err);
  }
  console.log(result);
});
*/
