// frontend/src/components/TaskForm.js
import React, { useState } from 'react';
import { createTask } from '../services/api';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="w-full p-2 mb-4 border"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-4 border"
        required
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
