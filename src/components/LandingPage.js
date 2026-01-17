import React from 'react';
import Header from './Header';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Header isLanding={true} />
    </div>
  );
}

export default LandingPage;