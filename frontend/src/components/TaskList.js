import React, { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]); // Initial state set to an empty array
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle any errors

  useEffect(() => {
    // Fetch tasks from the API
    fetch('http://127.0.0.1:8000/api/tasks/tasks')
      .then((response) => response.json())
      .then((data) => {
        // Check if the data is an array
        if (Array.isArray(data)) {
          setTasks(data); // Directly use the array if it's returned
        } else {
          console.error('Expected an array, but got:', data);
          setTasks([]); // Set an empty array if data format is incorrect
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setError(error.message); // Store error message if the fetch fails
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty dependency array to fetch data once on mount

  // If data is still loading
  if (loading) {
    return <div className="text-center text-gray-600">Loading tasks...</div>;
  }

  // If there was an error fetching the tasks
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // Render the tasks list
  return (
    <div className="container mx-auto p-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
              <p className="text-gray-600 mt-2">{task.description}</p>
              <p className="mt-4 text-sm text-gray-500">
                <span className="font-semibold">Due:</span> {task.due_date}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-semibold">Priority:</span> 
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    task.priority === 'high' ? 'bg-red-100 text-red-600' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
