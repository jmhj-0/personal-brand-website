import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css';

function GoodreadsFeed() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/goodreads?user_id=145364540');
        setReviews(response.data.reviews || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    // Poll every 5 minutes
    const interval = setInterval(fetchReviews, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="feed-card">
        <h3>Goodreads Updates</h3>
        <p>Loading book reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-card">
        <h3>Goodreads Updates</h3>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="feed-card">
      <h3>Goodreads</h3>
      {reviews.length === 0 ? (
        <p>No recent reviews.</p>
      ) : (
        <div className="goodreads-container">
          {reviews.map((review, index) => (
            <div key={index} className="goodreads-item">
              {review.book_image && (
                <a href={review.book_url} target="_blank" rel="noopener noreferrer">
                  <img src={review.book_image} alt={review.title} className="goodreads-image" />
                </a>
              )}
              <div className="goodreads-content">
                <a href={review.book_url} target="_blank" rel="noopener noreferrer" className="goodreads-title">{review.title}</a><br />AUTHOR: {review.author}, RATING: {review.rating}/5, REVIEWED @ {new Date(review.review_date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GoodreadsFeed;