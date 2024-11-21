import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [completed, setCompleted] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      due_date: dueDate,
      priority,
      completed,
      reminder,
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
      setCompleted(false);
      setReminder(false);
      setError('');
    } catch (error) {
      setError('Error creating task: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-400">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <i className="bi bi-plus-circle text-blue-600 text-3xl"></i>
          <h2 className="text-2xl font-semibold text-gray-800">Create Task</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Task Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Task Description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Completed Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-gray-700 font-medium">Completed</label>
          </div>

          {/* Reminder Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-gray-700 font-medium">Reminder</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform duration-200 hover:scale-105"
          >
            <i className="bi bi-check-circle mr-2"></i> Create Task
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="mt-4 text-red-600 animate-pulse">{error}</p>}
      </div>
    </div>
  );
};

export default TaskForm;
