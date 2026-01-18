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
            <p>A Streamlit app for tracking personal expenses with interactive charts and budgeting features.</p>
            <a href="https://personal-expense-tracker-jmhj.streamlit.app/" target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          </div>
          <div className="project-card">
            <h3>PowerShell Data Automation Toolkit</h3>
            <p>A comprehensive PowerShell toolkit for Windows system administration with data export, GUI interface, and automated scheduling.</p>
            <a href="https://github.com/jmhj-0/data-automation-toolkit" target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          </div>
          <div className="project-card">
            <h3>SQL Query Performance Analyzer</h3>
            <p>A web application for analyzing SQL query performance with optimization suggestions for MySQL, PostgreSQL, and SQL Server.</p>
            <a href="https://web-production-03c63.up.railway.app/" target="_blank" rel="noopener noreferrer" className="project-link">
              View Project
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectsPage;