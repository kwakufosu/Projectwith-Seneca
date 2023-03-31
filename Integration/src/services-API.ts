import SENECA = require("seneca");
let seneca: SENECA.Instance = SENECA();
import { INote } from "@notes/interface/interface";

export function api(this: SENECA.Instance, _: any) {
  let seneca = this;

  this.add("area:api,action: fetch_note", function (_, respond) {
    seneca.act("area:note,action:fetch", respond);
  });

  this.add("area:api,action: create", function (msg, respond) {
    let args = msg;

    seneca.act("area: note, action: create", args, function (err, note: INote) {
      seneca.act("area: email, action:send_email", function (err, email) {
        if (note && email) {
          console.log(email);
          respond(err, { note, email });
        }
      });
    });
  });

  this.add("init:api", function (msg, respond) {
    seneca.act(
      "role:web",
      {
        routes: {
          prefix: "/api",
          pin: "area:api,action:*",
          map: {
            fetch_note: { GET: true },
            create: { GET: true, POST: true },
          },
        },
      },
      respond
    );
  });
}
