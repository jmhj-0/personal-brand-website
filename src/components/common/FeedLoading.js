import React from 'react';
import '../Feed.css';

const FeedLoading = ({ message = "Loading..." }) => (
  <div className="feed-card feed-loading">
    <div className="loading-skeleton">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line skeleton-text"></div>
      <div className="skeleton-line skeleton-text"></div>
    </div>
    <p style={{ textAlign: 'center', opacity: 0.7 }}>{message}</p>
  </div>
);

export default FeedLoading;