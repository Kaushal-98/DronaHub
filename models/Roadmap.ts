import mongoose, { Schema, models, model } from "mongoose";

const RoadmapItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
});

const RoadmapSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g. "DSA", "Placement Prep"
    items: [RoadmapItemSchema],
  },
  { timestamps: true }
);

export default models.Roadmap || model("Roadmap", RoadmapSchema);