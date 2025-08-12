<template>
  <div
    class="min-h-screen w-full overflow-x-hidden text-gray-800 font-sans flex flex-col aesthetic-bg"
  >
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 fixed w-full top-0 z-50 shadow-md transition-all duration-700"
    >
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo + Brand -->
        <div class="flex items-center space-x-3 animate-fade-in-down">
          <img
            src="../../assets/logo.png"
            alt="Logo"
            class="h-20 w-20 object-contain rounded-full border-4 border-pink-100 shadow-lg transition-transform hover:rotate-6 hover:scale-105 duration-300"
          />
          
          <div class="flex flex-col">  
            <h1 class="text-2xl font-extrabold text-pink-700 leading-tight">
              CanEls Studio
            </h1>
            <p class="text-sm text-purple-500 italic">
              "Abadikan Momen, Ciptakan Kenangan."
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-4 animate-fade-in-down">
          <router-link
            to="/halamanutama"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            >Home</router-link
          >
          <router-link
            to="/pricelist"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            >Booking</router-link
          >
          <router-link
            to="/about"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            >About Us</router-link
          >

          <router-link
            to="/kontak"
            class="text-purple-700 font-semibold hover:text-yellow-400 transition-colors duration-300"
            >Contact Us</router-link
          >
        </nav>
      </div>
    </header>

    <!-- Konten dinamis -->
    <main class="flex-grow pt-28 px-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t py-8 text-center text-gray-600">
      <div
        class="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      >
        <p class="text-sm">&copy; 2025 CanEls Studio. All rights reserved.</p>
        <div class="flex space-x-6">
          <!-- Instagram -->
          <a
            href="https://www.instagram.com/millow.happyyxx"
            target="_blank"
            class="flex items-center space-x-1 text-gray-700 hover:text-pink-500 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-pink-400 transition-transform transform hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm8.75 2a.75.75 0 110 1.5.75.75 0 010-1.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z"
              />
            </svg>
            <span>Instagram</span>
          </a>
          <!-- Maps -->
          <a
            href="https://maps.app.goo.gl/Sy8KrPNeB5L1Jsio8?g_st=ac"
            target="_blank"
            class="flex items-center space-x-1 text-gray-700 hover:text-blue-500 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-blue-400 transition-transform transform hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 22s8-6.5 8-13A8 8 0 004 9c0 6.5 8 13 8 13z"
              />
            </svg>
            <span>Lokasi</span>
          </a>
          <!-- TikTok -->
          <a
            href="https://www.tiktok.com/@candid.place"
            target="_blank"
            class="flex items-center space-x-1 text-gray-700 hover:text-black transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-600 transition-transform transform hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9.5 3.5v10.4a2.1 2.1 0 10.9 1.7V7.1a5.9 5.9 0 006 1.2V6.3a3.4 3.4 0 01-2.1-.8 3.6 3.6 0 01-1.3-2H9.5z"
              />
            </svg>
            <span>TikTok</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LayoutPage",
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap");

body {
  scroll-behavior: smooth;
  font-family: "Comic Neue", sans-serif;
}

/* Animasi Fade In */
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fadeInDown 0.9s ease-out;
}

/* Background full motif */
.aesthetic-bg {
  background-color: #fff1f5; /* soft pink */
  background-image: radial-gradient(rgba(236, 72, 153, 0.15) 2px, transparent 2px),
    radial-gradient(rgba(236, 72, 153, 0.15) 2px, transparent 2px);
  background-position: 0 0, 15px 15px;
  background-size: 30px 30px;
}
</style>
