let seneca = require("seneca")();

export function api(this: any, options: any) {
  let seneca = this;

  this.add("area:api,action: fetch_note", function (msg: any, respond: any) {
    seneca.act("area:note,action:fetch", respond);
  });

  this.add("area:api,action: create", function (msg: any, respond: any) {
    let args = msg;

    seneca.act("area: note, action: create", args, respond);
  });

  this.add("init:api", function (msg: any, respond: any) {
    seneca.act(
      "role:web",
      {
        routes: {
          prefix: "/api",
          pin: "area:api,action:*",
          map: {
            fetch_note: { GET: true },
            create: { GET: false, POST: true },
          },
        },
      },
      respond
    );
  });
}
