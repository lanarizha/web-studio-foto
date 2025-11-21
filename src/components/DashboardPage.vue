<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-8">
        Halo!, {{ user?.name || user?.email || "User" }}
      </h1>
      <button
        @click="handleLogout"
        :disabled="loading"
        class="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

export default {
  name: "DashboardPage",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();

    const handleLogout = async () => {
      loading.value = true;
      try {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
        router.push('/login');
      } catch (err) {
        console.error("Error logging out:", err);
        // Even if logout fails on the server, we remove the token and redirect
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      handleLogout,
    };
  },
};
</script>
