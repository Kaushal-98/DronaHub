import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    branch: { type: String },
    semester: { type: Number },
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);