import express from "express";
import {
  showCreatePostPage,
  createPost,
  getPostByTitle,
  showEditPostPage,
  updatePost,
  deletePost,
  getAllPosts,
  getLatestPosts,
} from "../controllers/postController.js";
import authMiddleware from "../middlewares/middleware.js";
import multer from "multer";
import path from "path";
const router = express.Router();

// Set storage engine
const storage = multer.diskStorage({
  destination: "./src/public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Post routes
router.get("/api/posts", getAllPosts);
/**
 * @route GET /post/page/post
 * @description Show create post page
 * @access Private
 */

router.get("/page/post", showCreatePostPage);

router.post(
  "/api/post/new",
  authMiddleware,
  upload.single("image"),
  createPost
);
router.get("/api/post/:title/:id", getPostByTitle);
router.get("/api/post/:id/edit", authMiddleware, showEditPostPage);
router.put("/api/post/:id/update", authMiddleware, updatePost);
router.delete("/api/post/:id/delete", authMiddleware, deletePost);
router.get("/api/latest/posts", getLatestPosts);

export default router;
