import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Navbar */}
      <nav className="bg-blue-700 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-yellow-300 transition-colors duration-200">
            <i className="bi bi-clipboard-check-fill"></i> Task Manager
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-yellow-300 transition-colors duration-200">Home</Link>
            <Link to="/tasks" className="hover:text-yellow-300 transition-colors duration-200">Tasks</Link>
            <Link to="/add-task" className="hover:text-yellow-300 transition-colors duration-200">Add Task</Link>
            <Link to="/task-item" className="hover:text-yellow-300 transition-colors duration-200"> Task Item</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto text-center py-16">
        <h1 className="text-5xl font-bold animate-fadeIn mb-4">Organize Your Tasks Seamlessly</h1>
        <p className="text-lg mb-6 animate-fadeIn">Effortlessly manage tasks with our simple, powerful interface.</p>
        <Link to="/add-task">
          <button className="px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-md shadow-lg hover:bg-yellow-300 transition-colors duration-200">
            Get Started <i className="bi bi-arrow-right"></i>
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="container mx-auto py-12 grid md:grid-cols-3 gap-6 text-center">
        <div className="feature-card p-6 bg-white text-blue-900 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <i className="bi bi-card-checklist text-4xl text-blue-600 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
          <p>Manage your tasks effortlessly with a user-friendly interface.</p>
        </div>
        <div className="feature-card p-6 bg-white text-blue-900 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <i className="bi bi-calendar-check text-4xl text-blue-600 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Stay Organized</h3>
          <p>Keep track of due dates and priorities for better productivity.</p>
        </div>
        <div className="feature-card p-6 bg-white text-blue-900 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
          <i className="bi bi-bell-fill text-4xl text-blue-600 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">Reminders</h3>
          <p>Set reminders and never miss an important task again.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-700 py-6 text-center text-white">
        <p>&copy; 2024 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
