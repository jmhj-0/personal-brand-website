import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Feed.css';
import { formatDate, formatNumber } from '../../utils/formatters';
import FeedLoading from '../common/FeedLoading';
import FeedError from '../common/FeedError';

function TwitterFeed() {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const renderTweetText = (text) => {
    const mentionRegex = /(@\w+)/g;
    const parts = text.split(mentionRegex);
    return parts.map((part, index) =>
      mentionRegex.test(part) ? <span key={index} className="mention">{part}</span> : part
    );
  };

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('/api/twitter?username=_jmhj');
        setTweets(response.data.tweets || []);
        setUser(response.data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();

    // Poll every 5 minutes
    const interval = setInterval(fetchTweets, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <FeedLoading message="Loading latest posts..." />;
  }

  if (error) {
    return <FeedError error={error} onRetry={() => window.location.reload()} />;
  }

  if (!user) {
    return (
      <div className="feed-card">
        <p>Loading user info...</p>
      </div>
    );
  }

  return (
    <div className="feed-card">
      {tweets.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <div className="tweets-container">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="tweet-item">
              <img src={user.profile_image_url} alt="Profile" className="tweet-profile-pic" />
              <div className="tweet-content">
                <p className="tweet-text">{renderTweetText(tweet.text)}</p>
                <small className="tweet-date">{formatDate(tweet.created_at)}</small>
                <div className="tweet-metrics">
                  <span>👍 {formatNumber(tweet.public_metrics?.like_count || 0)}</span>
                  <span>🔄 {formatNumber(tweet.public_metrics?.retweet_count || 0)}</span>
                  <span>👁️ {formatNumber(tweet.public_metrics?.impression_count || 0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TwitterFeed;
