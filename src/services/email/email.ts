import seneca from "seneca";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname + "../../../../.env") });
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
const sen = seneca();

interface argsTemplate {
  message: string;
}

let plugin = function (this: any, options: any) {
  let sen = this;
  sen.add(
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
        from: "kwakuboachiefosu@gmail.com",
        subject: "Sending with Twilio SendGrid is Fun",
        text: "and easy to do anywhere, even with Node.js", //will be dynamic
        html: `${args.message}`, //will be dynamic
      };

      sgMail
        .send(msg)
        .then(() => {
          respond(null, { result: "Email sent" });
        })
        .catch((e) => {
          respond(e, null);
        });
    }
  );
};

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

export {plugin as emailPlugin};
