const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const GiftIdea = require('./models/GiftIdea');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
// Get all gift ideas
app.get('/api/gift-ideas', async (req, res) => {
  try {
    const { occasion } = req.query;
    let query = {};
    
    if (occasion && occasion !== 'All') {
      query.occasion = occasion;
    }
    
    const giftIdeas = await GiftIdea.find(query).sort({ createdAt: -1 });
    res.json(giftIdeas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get unique occasions
app.get('/api/occasions', async (req, res) => {
  try {
    const occasions = await GiftIdea.distinct('occasion');
    res.json(['All', ...occasions]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new gift idea
app.post('/api/gift-ideas', async (req, res) => {
  try {
    const { name, idea, occasion, relationship } = req.body;
    
    const newGiftIdea = new GiftIdea({
      name,
      idea,
      occasion,
      relationship
    });
    
    const savedGiftIdea = await newGiftIdea.save();
    res.status(201).json(savedGiftIdea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update gift idea
app.put('/api/gift-ideas/:id', async (req, res) => {
  try {
    const { name, idea, occasion, relationship } = req.body;
    
    const updatedGiftIdea = await GiftIdea.findByIdAndUpdate(
      req.params.id,
      { name, idea, occasion, relationship },
      { new: true, runValidators: true }
    );
    
    if (!updatedGiftIdea) {
      return res.status(404).json({ message: 'Gift idea not found' });
    }
    
    res.json(updatedGiftIdea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete gift idea
app.delete('/api/gift-ideas/:id', async (req, res) => {
  try {
    const deletedGiftIdea = await GiftIdea.findByIdAndDelete(req.params.id);
    
    if (!deletedGiftIdea) {
      return res.status(404).json({ message: 'Gift idea not found' });
    }
    
    res.json({ message: 'Gift idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
