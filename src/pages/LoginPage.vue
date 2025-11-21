<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 p-4"
  >
    <div
      class="w-full max-w-sm bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 animate-fadeIn"
    >
      <h2
        class="text-3xl font-extrabold text-center text-purple-500 drop-shadow mb-8 tracking-wide"
      >
        Login
      </h2>

      <form @submit.prevent="login" class="space-y-5">
        <!-- Email -->
        <div class="relative">
          <span class="absolute left-3 top-3 text-gray-500">
            <i class="fas fa-envelope"></i>
          </span>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full pl-10 p-3 bg-white/20 text-black placeholder-pink/80 border border-white/40 rounded-xl focus:ring-2 focus:ring-purple-300 focus:bg-white/30 transition"
          />
        </div>

        <!-- Password -->
        <div class="relative">
          <span class="absolute left-3 top-3 text-gray-500">
            <i class="fas fa-lock"></i>
          </span>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            class="w-full pl-10 p-3 bg-white/20 text-black placeholder-pink/70 border border-white/40 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
          />
          <!-- Icon Mata -->
          <span
            class="absolute right-3 top-3 cursor-pointer text-gray-600"
            @click="showPassword = !showPassword"
          >
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-indigo-300 to-pink-300 text-white p-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition active:scale-95"
        >
          Login
        </button>
      </form>

      <p class="text-center mt-6 text-black/90">
        Belum punya akun?
        <a href="/register" class="font-semibold text-purple-400 hover:underline">
          Daftar di sini
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const router = useRouter();

const login = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("token", res.token);
    router.push("/home");
  } catch (err) {
    alert("Email atau password salah!");
  }
};
</script>
