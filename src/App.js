import React from 'react';
import './App.css';
import Header from './components/Header';
import FeedSection from './components/FeedSection';

function App() {
  return (
    <div className="App">
      <div className="bg-effects">
        <div className="bg-shape" style={{left: '5%', top: '10%', animationDelay: '0s'}}></div>
        <div className="bg-shape" style={{right: '10%', top: '30%', animationDelay: '2s'}}></div>
        <div className="bg-shape" style={{left: '15%', bottom: '20%', animationDelay: '4s'}}></div>
        <div className="bg-shape" style={{right: '5%', bottom: '10%', animationDelay: '1s'}}></div>
      </div>
      <Header />
      <main>
        <FeedSection />
      </main>
    </div>
  );
}

export default App;