const express = require('express');
const router = express.Router();
const News = require('../models/News');

// GET all news articles
router.get('/', async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 }); // use timestamps field
    res.json(newsList);
  } catch (err) {
    console.error('❌ Error fetching news:', err);
    res.status(500).json({ error: 'Server error while fetching news' });
  }
});

// POST a new news article
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const news = new News({
      title: title.trim(),
      content: content.trim(),
      author: author ? author.trim() : undefined
    });

    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (err) {
    console.error('❌ Error saving news:', err);
    res.status(500).json({ error: 'Server error while saving news' });
  }
});

module.exports = router;
