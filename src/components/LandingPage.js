import React from 'react';
import Header from './Header';
import BackgroundEffects from './BackgroundEffects';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <BackgroundEffects />
      <Header isLanding={true} />
    </div>
  );
}

export default LandingPage;