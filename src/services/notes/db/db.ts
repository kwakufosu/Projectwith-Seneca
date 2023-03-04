import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname + "../../../../../.env") });

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));
