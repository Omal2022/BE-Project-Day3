import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  userName: {
    type: String,
    default: "anonymous",
  },
  content: {
    type: String,
    required: [true, "Content field is required"],
  },
});


const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;