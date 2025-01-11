const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
