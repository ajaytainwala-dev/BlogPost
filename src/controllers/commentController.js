import Post from "../Database/models/Post.js";
import User from "../Database/models/User.js";
import Comment from "../Database/models/Comment.js";
// Get all comments
export const getComments = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = await Comment.find({ postId: postId }).populate({
      path: "authorId",
      select:"-password -role",
    });
    res.json(comments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const { content } = req.body;
    const user = req.user;

    const userID = await User.findById(user.id);
    if (!userID) {
      return res.status(404).json({ message: "User not found" });
    }
    const comment = new Comment({
      authorId: userID._id,
      content: content,
      postId: post._id,
    });
    await comment.save();
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    });
    // res.redirect(`/posts/${req.params.postId}`);
    res.json({ message: "Comment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId).populate("postId");
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const post = await Post.findById(comment.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Comment.findByIdAndDelete(commentId);
    await Post.findByIdAndUpdate(post._id, {
      $pull: { comments: commentId },
    });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
