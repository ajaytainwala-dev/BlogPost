import express from "express";
// import User from "../Database/models/User";
import Post from "../Database/models/Post.js";
import authMiddleware from "../middlewares/middleware.js";

const router = express.Router();

router.get("/api/dashboard", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view this page" });
    }

    const posts = await Post.find({ authorId: user.id });

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
