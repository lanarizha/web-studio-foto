<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-700 fixed w-full top-0 z-50 shadow-md">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-white">CanEls Studio</h1>
        <nav class="space-x-4 hidden md:block">
          <router-link to="/halamanutama" class="hover:text-yellow-300 text-white font-medium transition-colors duration-300">Home</router-link>
          <router-link to="/pricelist" class="hover:text-yellow-300 text-white font-medium transition-colors duration-300">Price List</router-link>
          <router-link to="/about" class="hover:text-yellow-300 text-white font-medium transition-colors duration-300">About Us</router-link>
          <router-link to="/kontak" class="hover:text-yellow-300 text-white font-medium transition-colors duration-300">Contact Us</router-link>
        </nav>
      </div>
    </header>

    <!-- Konten dinamis -->
    <main class="flex-grow pt-28 px-4">
      <slot /> <!-- Ini akan menampilkan isi halaman yang dibungkus oleh LayoutPage -->
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t py-8 text-center text-gray-600">
      <div class="max-w-5xl mx-auto space-y-4">
        <div class="flex flex-col md:flex-row justify-between items-center px-4">
          <p class="text-sm">&copy; 2025 CanEls Studio. All rights reserved.</p>
          <div class="flex space-x-4 mt-2 md:mt-0">
            <a href="https://instagram.com/yourstudio" target="_blank" class="hover:text-pink-500">Instagram</a>
            <a href="https://wa.me/6281234567890" target="_blank" class="hover:text-green-500">WhatsApp</a>
            <a href="https://goo.gl/maps/example" target="_blank" class="hover:text-blue-500">Lokasi</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "LayoutPage"
}
</script>

<style scoped>
body {
  scroll-behavior: smooth;
}
</style>
