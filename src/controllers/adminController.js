import User from "../Database/models/User.js";
import Post from "../Database/models/Post.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, role: "admin" });
    if (!user) {
      // Changed user.length == 0 to !user for correct check
      return res.json({ error: "User not found or unauthorized" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user: user, token: token });
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong" });
  }
};

export const getAllAdminPosts = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res.json({ error: "Unauthorized" });
    }

    const posts = await Post.find().populate({path:"authorId",select:"name email"});
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong" });
  }
};

export const getAllAdminUsers = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res.json({ error: "Unauthorized" });
    }
    const users = await User.find({ role: { $ne: "admin" } });
    const postCount = await Post.aggregate([
      { $group: { _id: "$authorId", count: { $sum: 1 } } },
    ]);
    const userMap = users.map(user => {
      const post = postCount.find(p => p._id.toString() === user._id.toString());
      return {
      ...user.toObject(),
      postCount: post ? post.count : 0
      };
    });
    res.json({ users: userMap });
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res.json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong" });
  }
}

export const fetchProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      return res.json({ error: "Unauthorized" });
    }
    const { userID } = req.params;
    const userProfile = await User.findById(userID).select("-password -role");
    if (!userProfile) {
      return res.json({ error: "User not found" });
    }
    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.json({ error: "Something went wrong" });
  }
}