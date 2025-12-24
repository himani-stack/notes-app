require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Note = require('./models/Note');
const auth = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("-----------------------------------------");
    console.log(" DATABASE CONNECTED SUCCESSFULLY!");
    console.log("-----------------------------------------");
  })
  .catch((err) => {
    console.log(" DATABASE CONNECTION ERROR:");
    console.log(err.message);
  });

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({ email: req.body.email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ message: 'User already exists or registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Note Routes
app.post('/api/notes', auth, async (req, res) => {
  try {
    const note = new Note({ ...req.body, userId: req.userId });
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Could not save note' });
  }
});

app.get('/api/notes', auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch notes' });
  }
});

app.delete('/api/notes/:id', auth, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
});
app.use((req, res) => {
  console.log("❌ 404 Error: The frontend tried to reach:", req.method, req.url);
  res.status(404).json({ message: "Route not found on server" });
});
app.listen(5000, () => console.log('Server running on port 5000'));