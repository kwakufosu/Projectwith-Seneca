import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname + "../../../../../.env") });

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("connected to db"));
