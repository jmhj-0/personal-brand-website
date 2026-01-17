import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Feed.css';
import { truncateText } from '../../utils/formatters';

function SteamFeed() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/steam?steamid=jmhj');
        setGames(response.data.games || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();

    // Poll every 5 minutes
    const interval = setInterval(fetchGames, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="feed-card">
        <h3>Steam Recently Played</h3>
        <p>Loading game activity...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feed-card">
        <h3>Steam Recently Played</h3>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="feed-card">
      {games.length === 0 ? (
        <p>No recent games.</p>
      ) : (
        <div className="games-list">
          {games.map((game, index) => (
            <div key={index} className="game-item">
              {game.img_icon_url && (
                <a href={`https://store.steampowered.com/app/${game.appid}`} target="_blank" rel="noopener noreferrer">
                  <img src={game.img_icon_url} alt={game.name} className="game-icon" />
                </a>
              )}
              <div className="game-info">
                <a href={`https://store.steampowered.com/app/${game.appid}`} target="_blank" rel="noopener noreferrer" className="game-title" title={game.name}>{truncateText(game.name, 25)}</a><br />2W PLAYTIME: {Math.floor(game.playtime_2weeks / 60)}h {game.playtime_2weeks % 60}m, TOTAL: {Math.floor(game.playtime_forever / 60)}h {game.playtime_forever % 60}m
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SteamFeed;
