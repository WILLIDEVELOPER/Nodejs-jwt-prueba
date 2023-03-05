import { Schema, model } from "mongoose";

export const ROLES = ["egresado", "admin", "lider universitario"]

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", roleSchema);
