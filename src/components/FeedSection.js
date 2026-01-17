import React, { useState, Suspense } from 'react';
import './FeedSection.css';

const TwitterFeed = React.lazy(() => import('./feeds/TwitterFeed'));
const MALCombinedFeed = React.lazy(() => import('./feeds/MALCombinedFeed'));
const GoodreadsFeed = React.lazy(() => import('./feeds/GoodreadsFeed'));
const SteamFeed = React.lazy(() => import('./feeds/SteamFeed'));

const feedTypes = [
  { id: 'twitter', name: 'X Posts', component: TwitterFeed, wrapper: 'twitter-wrapper' },
  { id: 'mal', name: 'MAL Updates', component: MALCombinedFeed, wrapper: 'mal-wrapper' },
  { id: 'goodreads', name: 'Goodreads Reviews', component: GoodreadsFeed, wrapper: 'goodreads-wrapper' },
  { id: 'steam', name: 'Steam Games', component: SteamFeed, wrapper: 'steam-wrapper' },
];

function FeedSection() {
  const [collapsedFeeds, setCollapsedFeeds] = useState(new Set());

  const toggleFeedCollapse = (feedId) => {
    setCollapsedFeeds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(feedId)) {
        newSet.delete(feedId);
      } else {
        newSet.add(feedId);
      }
      return newSet;
    });
  };

  return (
    <section id="feeds" className="feed-section">
      <div className="feed-controls">
        <div className="filter-buttons">
          {feedTypes.map(feed => (
            <button
              key={feed.id}
              onClick={() => document.getElementById(feed.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="control-btn"
            >
              {feed.name}
            </button>
          ))}
        </div>
      </div>
      <div className="feeds-grid">
        {feedTypes.map(feed => {
            const FeedComponent = feed.component;
            return (
              <div key={feed.id} id={feed.id} className={`feed-wrapper ${feed.wrapper} ${collapsedFeeds.has(feed.id) ? 'collapsed' : ''}`}>
                <div className="feed-header">
                  <button
                    className="collapse-btn"
                    onClick={() => toggleFeedCollapse(feed.id)}
                  >
                    {collapsedFeeds.has(feed.id) ? '+' : '-'}
                  </button>
                </div>
                {!collapsedFeeds.has(feed.id) && (
                  <Suspense fallback={<div className="feed-card"><p>Loading {feed.name}...</p></div>}>
                    <FeedComponent />
                  </Suspense>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default FeedSection;