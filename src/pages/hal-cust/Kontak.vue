<template>
  <LayoutPage>
    <div
      class="min-h-screen flex flex-col items-center justify-start p-6 font-sans text-black transition-all duration-300 ease-in-out"
    >
      <!-- Header -->
      <header class="w-full flex items-center justify-between mb-8">
        <div class="flex items-center space-x-2">
          <!-- Kosongkan atau isi logo di sini jika dibutuhkan -->
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-md w-full text-center space-y-10 animate-fade-in">
        <!-- Open Hours Card -->
        <div
          class="bg-purple-100/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
        >
          <img
            :src="clock"
            alt="Camera Icon"
            class="inline-block w-12 h-10 object-contain ml-2 align-middle drop-shadow"
          />
          <h2 class="text-2xl font-semibold mb-2 text-pink-700">Open Hours:</h2>
          <p class="text-gray-600 font-medium mb-1">Everyday depends on the outlet</p>
          <p class="text-gray-800 text-lg font-semibold">09:00 - 21:00 WIB</p>
        </div>

        <!-- Call Card (Admin) -->
        <div
          class="bg-pink-100/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
        >
          <img
            :src="phone"
            alt="Camera Icon"
            class="inline-block w-12 h-10 object-contain ml-2 align-middle drop-shadow"
          />
          <div class="flex justify-center mb-3"></div>
          <h3 class="text-xl font-semibold mb-1 text-purple-700">Give Us A Call:</h3>
          <p class="text-gray-600">Admin</p>

          <!-- Tombol Chat WhatsApp -->
          <a
            href="https://wa.me/6283890642797?text=Halo%20Admin,%20saya%20ingin%20bertanya%20tentang%20jasa%20foto."
            target="_blank"
            class="mt-4 inline-block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full shadow-md transition-all duration-300"
          >
            💬 Chat Admin
          </a>
        </div>

        <!-- Email Card -->
        <div
          class="bg-blue-100/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
        >
          <div class="flex justify-center mb-3">
            <img
              :src="email"
              alt="Camera Icon"
              class="inline-block w-12 h-10 object-contain ml-2 align-middle drop-shadow"
            />
          </div>
          <h3 class="text-xl font-semibold mb-1 text-blue-700">Send Us A Message:</h3>
          <a
            href="mailto:lelmmp97@gmail.com"
            class="text-blue-600 hover:text-blue-800 hover:underline text-lg transition duration-300"
          >
            CanElsStudio@gmail.com
          </a>
        </div>
      </main>

      <!-- WhatsApp Floating Button
      <a
        href="https://wa.me/6283890642797"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        class="fixed bottom-6 right-6 w-14 h-14 bg-green-600 rounded-full shadow-xl flex items-center justify-center hover:bg-green-700 hover:scale-110 hover:shadow-2xl transition-all duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.88 3.549a9.035 9.035 0 11-12.53 12.54l-2.49.9.9-2.49a9.04 9.04 0 0114.12-10.94z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.68 15.485a6.68 6.68 0 01-3.274.897 6.751 6.751 0 01-6.278-4.35l-.322-1.2 1.938-.408a.75.75 0 01.858.544l.278 1.072a.75.75 0 01-.354.815l-1.527.991m4.552-3.56l1.25 1.165"
          />
        </svg>
      </a> -->
    </div>
  </LayoutPage>
</template>

<script setup>
import LayoutPage from "../../layouts/layout-cust/LayoutPage.vue";
import phone from "../../assets/phone.gif";
import clock from "../../assets/clock.gif";
import email from "../../assets/email.gif";
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

.animate-fade-in {
  animation: fadeInDown 0.9s ease-out;
}
</style>
