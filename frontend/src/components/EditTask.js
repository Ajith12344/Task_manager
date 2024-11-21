import React, { useState } from 'react';
import axios from 'axios';

const EditTask = ({ task, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    priority: task.priority
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    axios.put(`http://127.0.0.1:8000/api/tasks/tasks/${task.id}/`, formData)
      .then(response => {
        onSave(response.data); // Pass updated task back to parent
        onClose(); // Close the modal
      })
      .catch(error => {
        console.error('Error updating task:', error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="form-input mt-1 block w-full"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            className="form-input mt-1 block w-full"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            name="due_date"
            className="form-input mt-1 block w-full"
            value={formData.due_date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Priority</label>
          <select
            name="priority"
            className="form-select mt-1 block w-full"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
