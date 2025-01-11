const express = require('express');
const { getAllPosts, createPost, getPostById, deletePostById, updatePostById } = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes for posts
router.get('/', getAllPosts);
router.post('/', auth, createPost);  // Protected route
router.get('/:id', getPostById);
router.delete('/:id', auth, deletePostById); // Protected route
router.put('/:id', auth, updatePostById); // Protected route
router.patch('/:id', auth, updatePostById); // Protected route

module.exports = router;
