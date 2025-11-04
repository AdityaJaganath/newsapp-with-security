import React, { useState, useEffect } from 'react';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('us');
  const REQUIRE_AUTH = String(process.env.REACT_APP_REQUIRE_AUTH || 'false').toLowerCase() === 'true';
  const [token, setToken] = useState(() => (REQUIRE_AUTH ? localStorage.getItem('token') || '' : ''));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        console.log('Fetching news...', { category, country, auth: REQUIRE_AUTH });
        const headers = REQUIRE_AUTH && token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(
          `/api/news?category=${category}&country=${country}`,
          { headers }
        );
        const data = await response.json();
        console.log('Fetch complete. Articles:', data?.articles?.length || 0, data?.status || '');
        if (response.status === 401) {
          setNews([]);
        } else {
          setNews(data.articles || []);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    if (REQUIRE_AUTH && !token) {
      setLoading(false);
      return;
    }
    fetchNews();
  }, [category, country, REQUIRE_AUTH, token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data?.error || 'Login failed');
        return;
      }
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUsername('');
      setPassword('');
    } catch (err) {
      setAuthError('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setNews([]);
  };

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
      {REQUIRE_AUTH && (
        !token ? (
          <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: '0 auto 24px', display: 'grid', gap: 12 }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: 8 }}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: 8 }}
              required
            />
            <button type="submit" style={{ padding: 10 }}>Login</button>
            {authError && <div style={{ color: 'crimson' }}>{authError}</div>}
            <div style={{ color: '#6b7280', fontSize: 12 }}>Demo user: test / password123</div>
          </form>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button onClick={handleLogout} style={{ padding: 8 }}>Logout</button>
          </div>
        )
      )}

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