const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const logger = require('./middleware/logger');
require('dotenv').config();  // Load environment variables

const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/posts', postRoutes);
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas cloud...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});