import { emailPlugin } from "./controller/email";

require("seneca").use(emailPlugin).listen({host:'172.18.0.3', port: '5000', pin: "area:email" });
