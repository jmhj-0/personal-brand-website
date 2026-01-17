import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Feed.css';

function MALCombinedFeed() {
  const [anime, setAnime] = useState([]);
  const [manga, setManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animeResponse, mangaResponse] = await Promise.all([
          axios.get('/api/mal?username=jmhj'),
          axios.get('/api/manga?username=jmhj')
        ]);
        setAnime(animeResponse.data.anime || []);
        setManga(mangaResponse.data.manga || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="feed-card">
        <h3>MyAnimeList Updates</h3>
        <p>Loading anime and manga lists...</p>
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
      <div className="mal-combined-container">
        <div className="mal-section">
          <h4>Anime</h4>
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
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="mal-title">{item.title}</a>
                    <br />
                    STATUS={item.status}, SCORE={item.score}, UPDATED @ {new Date(item.updated_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="manga-section">
          <h4>Manga</h4>
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
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="manga-title">{item.title}</a>
                    <br />
                    STATUS={item.status}, SCORE={item.score}, UPDATED @ {new Date(item.updated_at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MALCombinedFeed;
