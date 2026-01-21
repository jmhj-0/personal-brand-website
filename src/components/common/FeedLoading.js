import React from 'react';
import '../Feed.css';

const FeedLoading = ({ message = "Loading..." }) => (
  <div className="feed-card feed-loading">
    <div className="loading-animation">
      <div className="loading-shape shape-circle"></div>
      <div className="loading-shape shape-triangle"></div>
      <div className="loading-shape shape-square"></div>
      <div className="loading-shape shape-hexagon"></div>
    </div>
    <p style={{ textAlign: 'center', opacity: 0.7, marginTop: '20px' }}>{message}</p>
  </div>
);

export default FeedLoading;