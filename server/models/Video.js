import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  views: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  like: {
    type: [String],
    default: [],
  },
  dislike: {
    type: [String],
    default:[]
  },
},{timestamps:true}
);
export default mongoose.model("Video", videoSchema);
