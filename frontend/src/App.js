import React, { useState, useEffect } from 'react';
import { getTasks } from './services/api';  // Use getTasks instead of fetchTasks
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

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
    <div className="App">
      <TaskForm refreshTasks={fetchTasks} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
