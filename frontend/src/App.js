import React, { useState, useEffect } from 'react';
import { getTasks } from './services/api';  // Use getTasks instead of fetchTasks
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const taskData = await getTasks();
      setTasks(taskData);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []); // Run fetchTasks when the component mounts

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/task-item" element={<TaskItem />} />
      </Routes>
    </Router>
  );
}

export default App;
