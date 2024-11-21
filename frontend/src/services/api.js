const BASE_URL = 'http://127.0.0.1:8000/api/tasks';

export const getTasks = async (filters = {}) => {
  const url = new URL(BASE_URL + '/');
  Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]));
  const response = await fetch(url);
  return await response.json();
};

export const createTask = async (taskData) => {
  const response = await fetch(`${BASE_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  return await response.json();
};

export const markTaskCompleted = async (taskId) => {
  // Using PATCH to mark the task as completed
  const response = await fetch(`${BASE_URL}/${taskId}cd`, {
    method: 'PATCH', // Changed to PATCH for updating a resource partially
  });
  return await response.json();
};

export const getCompletedTasks = async () => {
  const response = await fetch(`${BASE_URL}/completed/`);
  return await response.json();
};

export const updateTask = async (taskId, taskData) => {
  // Using PUT for updating the entire task
  const response = await fetch(`${BASE_URL}/${taskId}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  return await response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${BASE_URL}/${taskId}/`, {
    method: 'DELETE'
  });
  return response.ok;
};
