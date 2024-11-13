import React, { useState } from 'react';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      due_date: dueDate,
      priority,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks/tasks/#post-object-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      console.log('Task created:', newTask);

      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setError('');
    } catch (error) {
      setError('Error creating task: ' + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Task</h2>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
          />
        </div>

        {/* Due Date Input */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Priority Select */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Create Task
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default TaskForm;
