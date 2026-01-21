import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './App.css';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import LandingPage from './components/LandingPage';
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <SwitchTransition>
        <CSSTransition key={location.pathname} classNames="page" timeout={300}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;