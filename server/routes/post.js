const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const Post = require("../models/Post");

// @route GET api/posts
// @desc GET post
// @access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    // Lấy hết các post của người dùng có userId và lấy thêm username của user đó bằng hàm populate
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  // Lấy các giá trị được nhập vào từ client
  const { title, description, url, status } = req.body;

  // Simple validation - Bỏ trống title
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    // Tạo 1 post
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    // Lưu post vào db
    await newPost.save();

    res.json({ success: true, message: "Happy learning", post: newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/posts
// @desc Update post
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation - Bỏ trống title
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });

  try {
    // Tạo 1 post object để update lại vào db
    let updatedPost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };

    // Điều kiện khi update: id của post phải có trong db, user update chính là user trong post
    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    // Update post vào db ({new: true} - để trả về post vừa update)
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    // User not authorised to update post - Không update dc
    if (!updatedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route DELETE api/posts
// @desc Delete post
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // Điều kiện delete - post tồn tại và user delete chính là user trong post
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    // Delete post
    const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

    // User not authorised or post not found
    if (!deletedPost)
      return res.status(401).json({
        success: false,
        message: "Post not found or user not authorised",
      });

    res.json({
      success: true,
      post: deletedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
