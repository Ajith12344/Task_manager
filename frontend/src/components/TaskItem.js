import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit, FaCheckCircle } from 'react-icons/fa'; // Bootstrap icons for actions
import EditTask from './EditTask';
const TaskItem = () => {
  const [tasks, setTasks] = useState([]);  // Initialize tasks as an empty array
  const [filters, setFilters] = useState({
    priority: '',
    dueDate: '',
    completed: ''
  });
  const [editTask, setEditTask] = useState(null); // Track task to edit

  // Fetch tasks from API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/tasks')
      .then(response => {
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleComplete = (taskId) => {
    axios.patch(`http://127.0.0.1:8000/api/tasks/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
      })
      .catch(error => {
        console.error('Error marking task as complete:', error);
      });
  };

  const handleDelete = (taskId) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/tasks/${taskId}`)
      .then(response => {
        setTasks(tasks.filter(task => task.id !== taskId));
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const handleEdit = (task) => {
    setEditTask(task); // Set the task to be edited
  };

  const handleSave = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setEditTask(null); // Close the modal
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };


  const filteredTasks = tasks.filter(task => {
    return (
      (filters.priority === '' || task.priority === filters.priority) &&
      (filters.dueDate === '' || task.due_date === filters.dueDate) &&
      (filters.completed === '' || task.completed.toString() === filters.completed)
    );
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>

      {/* Filters */}
      <div className="mb-4 flex space-x-4">
        <select
          name="priority"
          className="form-select w-1/3"
          onChange={handleFilterChange}
          value={filters.priority}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          name="dueDate"
          className="form-input w-1/3"
          onChange={handleFilterChange}
          value={filters.dueDate}
        />

        <select
          name="completed"
          className="form-select w-1/3"
          onChange={handleFilterChange}
          value={filters.completed}
        >
          <option value="">All Statuses</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-500">Due Date: {task.due_date}</p>
              <p className="text-sm text-gray-500">Priority: {task.priority}</p>
              <p className="text-sm text-gray-500">
                Status: {task.completed ? <span className="text-green-500">Completed</span> : <span className="text-red-500">Incomplete</span>}
              </p>
            </div>
            <div className="flex space-x-3">
              {!task.completed && (
                <button
                  onClick={() => handleComplete(task.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <FaCheckCircle />
                  Mark as Complete
                </button>
              )}

<button onClick={() => handleEdit(task)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(task.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaTrashAlt />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
       {/* Edit Task Modal */}
       {editTask && <EditTask task={editTask} onSave={handleSave} onClose={() => setEditTask(null)} />}
    </div>
  );
};

export default TaskItem;
