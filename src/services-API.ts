let seneca = require("seneca")();

export function api(this: any, options: any) {
  let seneca = this;

  this.add("area:api,action: fetch_note", function (msg: any, respond: any) {
    seneca.act("area:note,action:fetch", respond);
  });

  this.add("area:api,action: create", function (msg: any, respond: any) {
    let args = msg;

    seneca.act(
      "area: note, action: create",
      args,
      function (err: Error, note: any) {
        seneca.act(
          "area: email, action:send_email",
          function (err: any, email: any) {
            if (note && email) {
              console.log(email);
              respond(err, { note, email });
            }
            
          }
        );
      }
    );
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
            create: { GET: true, POST: true },
          },
        },
      },
      respond
    );
  });
}
