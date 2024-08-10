import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    lastEditedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    isLocked: { type: Boolean, default: false },
    lockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    lockedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model.blogs || mongoose.model("blogs", blogsSchema);
