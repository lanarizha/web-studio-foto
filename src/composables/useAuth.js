import { ref, onMounted } from 'vue';
import api from '../services/api';

export function useAuth() {
  const user = ref(null);
  const loading = ref(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/auth/me'); // Assuming an endpoint like /api/auth/me exists
        user.value = response.data;
      } catch (error) {
        console.error('Authentication check failed:', error);
        localStorage.removeItem('token');
        user.value = null;
      }
    } else {
      user.value = null;
    }
    loading.value = false;
  };

  onMounted(checkAuth);

  return {
    user,
    loading,
    checkAuth
  };
}