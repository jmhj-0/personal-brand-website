import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feed.css';

function MangaFeed() {
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get('/api/manga?username=jmhj');
        setManga(response.data.manga || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();

    // Poll every 5 minutes
    const interval = setInterval(fetchManga, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="feed-card">
        <p>Loading manga list updates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-card">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="feed-card">
      {manga.length === 0 ? (
        <p>No recent updates.</p>
      ) : (
        <div className="manga-container">
          {manga.map((item, index) => (
            <div key={index} className="manga-item">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src={item.image_url} alt={item.title} className="manga-image" />
              </a>
              <div className="manga-content">
                STATUS={item.status}, SCORE={item.score}, UPDATED @ {new Date(item.updated_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MangaFeed;