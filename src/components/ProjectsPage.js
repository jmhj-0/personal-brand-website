import React from 'react';
import Header from './Header';

function ProjectsPage() {
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
        <h2>My Projects</h2>
        <div className="projects-list">
          <div className="project-card">
            <h3>Personal Expense Tracker</h3>
            <p>A Streamlit app for tracking personal expenses.</p>
            <a href="https://personal-expense-tracker-jmhj.streamlit.app/" target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectsPage;