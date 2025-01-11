const Post = require("../models/postModel");
const Joi = require("joi");

// Validation schema for Post
const postSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(5).required(),
});

// Create a new post
exports.createPost = async (req, res) => {
  const { error } = postSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// get all post by getAllPosts
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find().skip(skip).limit(limit);
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

// get a post by getPostById
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // Fetch post by ID from the database
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post); // Return the post data
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching the post" });
  }
};

// Delete post by ID
exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id); // Delete the post by ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" }); // Return success message
  } catch (err) {
    res.status(500).json({ message: "Server error while deleting the post" });
  }
};

// Controller to update a post by ID
exports.updatePostById = async (req, res) => {
    const { title, content } = req.body;
  // Check if at least one field is provided for update
  if (!title && !content) {
    return res
      .status(400)
      .json({
        message: "At least one field (title or content) must be provided",
      });
  }

  // Build the update object dynamically to allow partial updates
  const updateFields = {};
  if (title) updateFields.title = title;
  if (content) updateFields.content = content;

  try {
    // Use findByIdAndUpdate with the $set operator to only update specific fields
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }, // Only update the fields provided
      { new: true, runValidators: true } // Return the updated document and validate updates
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post); // Return the updated post
  } catch (err) {
    res.status(500).json({ message: "Server error while updating the post" });
  }
};
