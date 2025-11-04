import React, { useState, useEffect } from 'react';
import './App.css';
import NewsList from './components/NewsList';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState('us');
  const [category, setCategory] = useState('general');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/news?country=${country}&category=${category}`
        );
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country, category]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>News Updates</h1>
        <div className="filters">
          <select 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            className="filter-select"
          >
            <option value="us">United States</option>
            <option value="gb">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="in">India</option>
          </select>
          
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            <option value="general">General</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </header>
      
      <main>
        {loading ? (
          <div className="loading">Loading news...</div>
        ) : articles.length > 0 ? (
          <NewsList articles={articles} />
        ) : (
          <div className="no-articles">No articles found. Please try different filters.</div>
        )}
      </main>
      
      <footer>
        <p>Powered by NewsAPI.org</p>
      </footer>
    </div>
  );
}

export default App;
