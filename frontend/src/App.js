// frontend/src/App.js
import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
