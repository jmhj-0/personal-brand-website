import React from 'react';
import '../Feed.css';

const FeedError = ({ error, onRetry }) => (
  <div className="feed-card feed-error">
    <div className="error-content">
      <div className="error-icon">⚠️</div>
      <h3>Error Loading Feed</h3>
      <p>{error || "Something went wrong while loading this feed."}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-btn">
          Try Again
        </button>
      )}
    </div>
  </div>
);

export default FeedError;