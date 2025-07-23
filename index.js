const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const itemsRoutes = require('./routes/items');
const feedbackRoutes = require('./routes/feedback');
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/feedback', feedbackRoutes);

// Optionally remove these if handled in authRoutes
app.post('/api/signup', (req, res) => {
  console.log(req.body);
  res.json({ message: "User signed up successfully!" });
});

app.post('/api/login', (req, res) => {
  console.log(req.body);
  res.json({ message: "Login successful!" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
