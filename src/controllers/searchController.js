import User from "../models/User.js";
import Post from "../models/Post.js";

export const searchController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required." });
    }
    const searchQuery = { $regex: query, $options: "i" };
    const [users, posts] = await Promise.all([
      User.find({ name: searchQuery }).exec(),
      Post.find({ title: searchQuery })
        .populate({ path: "authorId", select: "-password" })
        .exec()
    ]);

    const results = {
      users,
      posts
    };

    res.json(results);
    res.json({ users, posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
