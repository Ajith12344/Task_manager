// frontend/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const { data } = await fetchTasks();
      setTasks(data);
    };

    loadTasks();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TaskForm onTaskAdded={setTasks} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default Home;
