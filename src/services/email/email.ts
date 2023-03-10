import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname + "../../../../.env") });
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface argsTemplate {
  message: string;
}

let emailPlugin = function (this: any, options: any) {
  this.add(
    { area: "email", action: "send_email" },
    function (
      args: argsTemplate,
      respond: (
        arg0: { e: Error } | null,
        arg1: { result: string } | null
      ) => void
    ) {
      const msg = {
        to: "kbfosu@st.ug.edu.gh", //will be dynamic
        from: "kwakuboachiefosu1@gmail.com",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js", //will be dynamic
        html: "Note recorded", //will be dynamic
      };

      sgMail
        .send(msg)
        .then(() => {
          respond(null, { result: "Email sent" });
        })
        .catch((e) => {
          console.log(e.response.body);
          respond(null, { result: "Email service cannot be reached" });
        });
    }
  );

  // this.add("init:emailPlugin ", function(msg:any, respond: any){
  //   sen.act('role:web',{ routes: {
  //   prefix: '/email',
  //   pin: {area:'email',action:'*'},
  //   map: {
  //     fetch: {GET:true},
  //     edit: {GET:false,POST:true},
  //   }
  //   }}, respond)
  //   });
};

/*
sen.ready(function(err){
  sen.act('role:web',{use:{
  prefix: '/email',
  pin: {area:'email',action:'*'},
  map:{
  fetch: {GET:true},
  edit: {GET:false,POST:true},
 
  }
  }});
*/

/*
// Testing to see if it works.It will be moved from here later on
sen.act(
  { area: "email", action: "send_email", message: "Football today" },
  function (err, result) {
    if (err) {
      console.log("=========");
      return console.error(err);
    }
    console.log(result);
  }
);
*/

export { emailPlugin };
