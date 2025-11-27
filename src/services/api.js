const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

async function request(method, endpoint, data = null, isAuth = true) {
  const headers = {
    'Accept': 'application/json',
  };
  
  const isFormData = data instanceof FormData;

  // Don't set Content-Type for FormData, the browser will do it
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

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
    config.body = isFormData ? data : JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error('API request failed');
      error.response = {
        data: errorData,
        status: response.status,
      };
      throw error;
    }
    
    // Handle 204 No Content response
    if (response.status === 204) {
      return null;
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
