import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
