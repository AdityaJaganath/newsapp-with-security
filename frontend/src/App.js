import React, { useState, useEffect } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('us');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        console.log('Fetching news...', { category, country });
        const response = await fetch(
          `/api/news?category=${category}&country=${country}`
        );
        const data = await response.json();
        console.log('Fetch complete. Articles:', data?.articles?.length || 0, data?.status || '');
        setNews(data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, country]);

  const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'in', name: 'India' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' }
  ];

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Latest News</h1>

      <div style={{ marginBottom: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 8, minWidth: 200 }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ padding: 8, minWidth: 200 }}
        >
          {countries.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <div>Loading…</div>
        </div>
      ) : news.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <div>No articles found. Check your API key and try a different category/country.</div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {news.map((article, index) => (
            <div key={index} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>{article.title}</h3>
                <div style={{ color: '#6b7280', fontSize: 12 }}>
                  {new Date(article.publishedAt).toLocaleDateString()} - {article.source?.name}
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>{article.description}</div>
              {article.url && (
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0d9488' }}>
                  Read more
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;