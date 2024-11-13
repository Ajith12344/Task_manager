import React from 'react';

function TaskItem({ task, onDelete, onComplete }) {
  return (
    <li className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">Due Date: {task.end_date}</p>
        <p className="text-sm text-gray-500">Priority: {task.priority}</p>
        <p className="text-sm text-gray-500">
          Status: {task.completed ? "Completed" : "Incomplete"}
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onComplete}
          disabled={task.completed}
          className={`px-4 py-2 rounded-lg ${
            task.completed
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {task.completed ? "Completed" : "Mark as Complete"}
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
