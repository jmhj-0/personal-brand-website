import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

function Header({ isLanding = false }) {
  const { isDark, toggleTheme } = useTheme();
  const [displayedName, setDisplayedName] = useState('');
  const fullName = 'ジョセフ　（ＪＭＨＪ)';

  useEffect(() => {
    if (isLanding) {
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullName.length) {
          setDisplayedName(fullName.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    } else {
      setDisplayedName(fullName);
    }
  }, [isLanding]);

  return (
    <>
      <button onClick={toggleTheme} className="theme-toggle-fixed" aria-label="Toggle theme">
        {isDark ? '☀️' : '🌙'}
      </button>
      <header className={`header ${isLanding ? 'landing-header' : ''}`}>
      <div className="header-content">
        <img src="/White Background.png" alt="Profile" className="profile-image" />
        <div>
          <h1>{displayedName}<span className="cursor">|</span></h1>
          <p className={isLanding ? 'fade-in-delay' : ''}>Developer | SQL Guru | AI Enthusiast</p>
        </div>
      </div>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/social-feeds" className="nav-link">Social Feeds</Link>
        <Link to="/projects" className="nav-link">Projects</Link>
      </nav>
      <div className="social-links">
        <a href="https://x.com/_jmhj" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/x.svg" alt="X/Twitter" />
        </a>
        <a href="https://discordapp.com/users/365859129165742091" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/discord.svg" alt="Discord" />
        </a>
        <a href="https://www.goodreads.com/user/show/145364540-jmhj" target="_blank" rel="noopener noreferrer">
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
        <a href="https://github.com/jmhj-0" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/github.svg" alt="GitHub" />
        </a>
      </div>
      {isLanding && (
        <div className="contact-info">
          <p><a href="mailto:joseph@jmhj.io" className="email-link">joseph@jmhj.io</a> <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/microsoftoutlook.svg" alt="Email" className="email-icon" /></p>
        </div>
      )}
      {isLanding && (
        <div className="motto">
          <blockquote>
            "Science is what we understand well enough to explain to a computer; art is everything else."
            <cite>— Donald E. Knuth</cite>
          </blockquote>
        </div>
      )}
    </header>
    </>
  );
}

export default Header;