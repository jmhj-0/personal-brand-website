import React from 'react';
import './App.css';
import Header from './components/Header';
import FeedSection from './components/FeedSection';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
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

export default App;