import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    profile_image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    post_text: {
      type: String,
    },
    post_image: {
      type: [String],
    },
    comments: {
      type: [String],
    },
    likes: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("blogs", blogSchema);

export default BlogModel;
