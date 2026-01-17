import React from 'react';
import Header from './Header';
import FeedSection from './FeedSection';
import ErrorBoundary from './ErrorBoundary';

function SocialFeedsPage() {
  return (
    <div className="App">
      <div className="bg-effects">
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
        <div className="bg-shape"></div>
      </div>
      <Header />
      <main>
        <ErrorBoundary>
          <FeedSection />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default SocialFeedsPage;