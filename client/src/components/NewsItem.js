import React from 'react';
import './NewsItem.css';

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  
  // Format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="news-item">
      {urlToImage && (
        <div className="news-image">
          <img src={urlToImage} alt={title} onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }} />
        </div>
      )}
      <div className="news-content">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p className="news-meta">
          {source?.name && <span className="news-source">{source.name}</span>}
          {publishedAt && (
            <span className="news-date">{formatDate(publishedAt)}</span>
          )}
        </p>
        {description && <p className="news-description">{description}</p>}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="read-more"
        >
          Read more →
        </a>
      </div>
    </article>
  );
};

export default NewsItem;
