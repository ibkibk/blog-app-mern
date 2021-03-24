import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a post title"],
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please add a post description"],
  },
  image: {
    type: String,
    default: "no-photo.jpg",
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  tags: [String],
  likes: {
    type: [String],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const PostMessage = mongoose.model("PostMessage", PostSchema);

export default PostMessage;
