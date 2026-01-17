import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

function Header({ isLanding = false }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <button onClick={toggleTheme} className="theme-toggle-fixed" aria-label="Toggle theme">
        {isDark ? '☀️' : '🌙'}
      </button>
      <header className={`header ${isLanding ? 'landing-header' : ''}`}>
      <div className="header-content">
        <img src="/White Background.png" alt="Profile" className="profile-image" />
        <div>
          <h1>ジョセフ　（ＪＭＨＪ)</h1>
          <p>Developer | Future Funk Conoisseur | AI Enthusiast</p>
        </div>
      </div>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/social-feeds" className="nav-link">Social Feeds</Link>
      </nav>
      <div className="social-links">
        <a href="https://x.com/_jmhj" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/x.svg" alt="X/Twitter" />
        </a>
        <a href="https://discordapp.com/users/365859129165742091" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/discord.svg" alt="Discord" />
        </a>
        <a href="https://www.goodreads.com/user/show/145364540-joseph-jensen" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/goodreads.svg" alt="Goodreads" />
        </a>
        <a href="https://open.spotify.com/user/jensenj.mh" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/spotify.svg" alt="Spotify" />
        </a>
        <a href="https://myanimelist.net/profile/jmhj" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/myanimelist.svg" alt="MyAnimeList" />
        </a>
        <a href="https://steamcommunity.com/id/jmhj" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/steam.svg" alt="Steam" />
        </a>
      </div>
      {isLanding && (
        <div className="contact-info">
          <p>joseph@jmhj.io <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/microsoftoutlook.svg" alt="Email" className="email-icon" /></p>
        </div>
      )}
    </header>
    </>
  );
}

export default Header;