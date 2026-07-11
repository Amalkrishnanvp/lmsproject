import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["pdf", "video", "link"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },
  },
  { timestamps: true }
);

export const StudyMaterial = mongoose.model(
  "StudyMaterial",
  studyMaterialSchema
);
