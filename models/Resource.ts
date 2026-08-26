import mongoose, { Schema, models, model } from "mongoose";

const ResourceSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["pyq", "notes"], required: true },
    branch: { type: String, required: true },
    semester: { type: Number, required: true },
    subject: { type: String, required: true },
    year: { type: Number },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    upvotes: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default models.Resource || model("Resource", ResourceSchema);