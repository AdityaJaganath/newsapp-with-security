exports.handler = async (event) => {
  try {
    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    if (!NEWS_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server misconfiguration: missing NEWS_API_KEY' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    const params = event.queryStringParameters || {};
    const country = params.country || 'us';
    const category = params.category || 'general';
    const pageSize = params.pageSize || '10';

    const url = new URL('https://newsapi.org/v2/top-headlines');
    url.searchParams.set('country', country);
    url.searchParams.set('category', category);
    url.searchParams.set('pageSize', pageSize);
    url.searchParams.set('apiKey', NEWS_API_KEY);

    const resp = await fetch(url.toString());
    const text = await resp.text();
    const headers = { 'Content-Type': 'application/json' };
    if (!resp.ok) {
      return { statusCode: resp.status || 502, body: text, headers };
    }
    return { statusCode: 200, body: text, headers };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Function error' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};
