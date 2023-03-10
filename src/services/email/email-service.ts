import { emailPlugin } from "./email";

require("seneca").use(emailPlugin).listen({ port: 5000, pin: "area:email" });
