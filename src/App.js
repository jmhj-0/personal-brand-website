import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './App.css';
import LandingPage from './components/LandingPage';
const SocialFeedsPage = lazy(() => import('./components/SocialFeedsPage'));

function App() {
  const location = useLocation();

  return (
    <SwitchTransition>
      <CSSTransition key={location.pathname} classNames="page" timeout={300}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/social-feeds" element={<SocialFeedsPage />} />
          </Routes>
        </Suspense>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;