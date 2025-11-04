require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5001;
const REQUIRE_AUTH = String(process.env.REQUIRE_AUTH || 'false').toLowerCase() === 'true';

// Middleware
app.use(cors());
app.use(express.json());

// News API Configuration
const NEWS_API_KEY = process.env.NEWS_API_KEY || 'YOUR_NEWSAPI_KEY';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

// When auth is required, set up login and JWT verification
let verifyJWT = (_req, _res, next) => next();
if (REQUIRE_AUTH) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const demoUser = {
    username: 'test',
    passwordHash: bcrypt.hashSync('password123', 10)
  };

  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) return res.status(400).json({ error: 'Username and password are required' });
      if (username !== demoUser.username) return res.status(401).json({ error: 'Invalid credentials' });
      const match = await bcrypt.compare(password, demoUser.passwordHash);
      if (!match) return res.status(401).json({ error: 'Invalid credentials' });
      if (!JWT_SECRET) return res.status(500).json({ error: 'Server misconfiguration: missing JWT secret' });
      const token = jwt.sign({ sub: demoUser.username }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Login failed' });
    }
  });

  verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'] || '';
    const parts = authHeader.split(' ');
    const token = parts.length === 2 && /^Bearer$/i.test(parts[0]) ? parts[1] : null;
    if (!token) return res.status(401).json({ error: 'Authorization token missing' });
    const JWT_SECRET_INNER = process.env.JWT_SECRET;
    if (!JWT_SECRET_INNER) return res.status(500).json({ error: 'Server misconfiguration: missing JWT secret' });
    try {
      const payload = jwt.verify(token, JWT_SECRET_INNER);
      req.user = payload;
      return next();
    } catch {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}

// Routes
app.get('/api/news', REQUIRE_AUTH ? verifyJWT : (req, res, next) => next(), async (req, res) => {
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
  console.log(`Server is running on port ${PORT} (auth: ${REQUIRE_AUTH ? 'ON' : 'OFF'})`);
});
