import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title field is required"],
  },
  content: {
    type: String,
    required: [true, "Conent field is required"],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
export default Post;
