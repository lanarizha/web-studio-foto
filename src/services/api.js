const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function request(method, endpoint, data = null, isAuth = true) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (isAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const config = {
    method: method,
    headers: headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

const api = {
  get: (endpoint, isAuth = true) => request('GET', endpoint, null, isAuth),
  post: (endpoint, data, isAuth = true) => request('POST', endpoint, data, isAuth),
  put: (endpoint, data, isAuth = true) => request('PUT', endpoint, data, isAuth),
  delete: (endpoint, isAuth = true) => request('DELETE', endpoint, null, isAuth),
};

export default api;
