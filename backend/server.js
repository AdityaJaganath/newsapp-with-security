require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// News API Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'YOUR_NEWSAPI_KEY';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

// Routes
app.get('/api/news', async (req, res) => {
  try {
    const { country = 'us', category = 'general', pageSize = 10 } = req.query;
    
    const response = await axios.get(NEWS_API_URL, {
      params: {
        country,
        category,
        pageSize,
        apiKey: NEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
