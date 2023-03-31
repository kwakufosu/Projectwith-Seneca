import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname + "../../../../.env") });
import sgMail from "@sendgrid/mail";
import SENECA = require("seneca");
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface argsTemplate {
  message: string;
}

let emailPlugin = function (this: SENECA.Instance, options: any) {
  this.add(
    { area: "email", action: "send_email" },
    function (args: argsTemplate, respond) {
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
};

export { emailPlugin };
