import Post from "../Database/models/Post.js";
// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "authorId", select: "-password -role" })
      .populate({ path: "comments", populate: { path: "authorId", select: "name" } })
      .exec();

    res.send(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

// Show create post page
export const showCreatePostPage = (req, res) => {
  res.render("post");
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const user = req.user;
    console.log(user);
    const image = req.file.filename;
    const newPost = new Post({
      title,
      content,
      authorId: user.id,
      tags: tags.split(","),
      image,
    });
    await newPost.save();
    // res.redirect("/");
    // res.send("done")
    res
      .status(200)
      .json({ success: true, message: "Post Created Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get post by ID
export const getPostByTitle= async (req, res) => {
  try {
    const id = req.params.id;
    const title = req.params.title;
    const post = await Post.findOne({ title: title, _id: id })
      .populate({ path: "authorId", select: "-password -role -email" })
      .exec();
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
    // res.render("post", { post });
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
};

// Show edit post page
export const showEditPostPage = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    res.render("editPost", { post });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    await Post.findByIdAndUpdate(req.params.id, {
      title,
      content,
      tags: tags.split(","),
    });
    res.redirect(`/posts/${req.params.id}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Get latest posts
export const getLatestPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({ path: "authorId", select: "-password -role -email -v -jobTitle -about -profileImage" })
      // .populate({ path: "comments", populate: { path: "authorId", select: "name" } })
      .exec();
    res.json({ success: true, posts });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

