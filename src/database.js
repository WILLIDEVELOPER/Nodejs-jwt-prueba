import mongoose from "mongoose";
import * as variables from "./config";

mongoose.set('strictQuery', true)
mongoose
  .connect(variables.MONGODB_URL)
  .then((db) => console.log("Db is connected"))
  .catch((err) => console.log(err));
