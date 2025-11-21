<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 p-4">
    <div
      class="w-full max-w-sm bg-white/20 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-white/30 animate-fadeIn"
    >
      <h2 class="text-3xl font-bold text-center text-purple-500 drop-shadow mb-8 tracking-wide">
        Create Account
      </h2>

      <form @submit.prevent="register" class="space-y-5">

        <!-- Nama -->
        <div class="relative">
          <span class="absolute left-3 top-3 text-gray-500">
            <i class="fas fa-user"></i>
          </span>
          <input
            v-model="name"
            type="text"
            placeholder="Nama Lengkap"
            class="w-full pl-10 p-3 bg-white/20 text-black placeholder-pink/70 border border-white/40 
                   rounded-xl focus:ring-2 focus:ring-pink-300 focus:bg-white/30 transition"
          />
        </div>

        <!-- Email -->
        <div class="relative">
          <span class="absolute left-3 top-3 text-gray-500">
            <i class="fas fa-envelope"></i>
          </span>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full pl-10 p-3 bg-white/20 text-black placeholder-pink/70 border border-white/40 
                   rounded-xl focus:ring-2 focus:ring-purple-300 focus:bg-white/30 transition"
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
            class="w-full pl-10 p-3 bg-white/20 text-black placeholder-pink/70 border border-white/40 
                   rounded-xl focus:ring-2 focus:ring-indigo-300 focus:bg-white/30 transition"
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
          class="w-full bg-gradient-to-r from-indigo-300 to-pink-300 text-white p-3 rounded-xl font-bold shadow-lg 
                 hover:opacity-90 transition active:scale-95"
        >
          Register
        </button>
      </form>

      <p class="text-center mt-6 text-black/90">
        Sudah punya akun?
        <a href="/login" class="font-semibold text-purple-400 hover:underline">
          Login di sini
        </a>
      </p>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import api from '../services/api'

const name = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false);

const register = async () => {
  try {
    const res = await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    alert('Registrasi berhasil! Silakan login.')
    window.location.href = '/login'
  } catch (err) {
    alert('Gagal mendaftar!')
  }
}
</script>
