import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css';

function MALFeed() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get('/api/mal?username=jmhj');
        setAnime(response.data.anime || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();

    // Poll every 5 minutes
    const interval = setInterval(fetchAnime, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="feed-card">
        <h3>MyAnimeList Updates</h3>
        <p>Loading anime list updates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-card">
        <h3>MyAnimeList Updates</h3>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="feed-card">
      {anime.length === 0 ? (
        <p>No recent updates.</p>
      ) : (
        <div className="mal-container">
          {anime.map((item, index) => (
            <div key={index} className="mal-item">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={item.image_url} alt={item.title} className="mal-image" />
              </a>
              <div className="mal-content">
                STATUS={item.status}, SCORE={item.score}, UPDATED @ {new Date(item.updated_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MALFeed;