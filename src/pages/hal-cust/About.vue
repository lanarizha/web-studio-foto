<template>
  <LayoutPage>
    <section class="bg-white text-gray-800 min-h-screen py-12 px-4 sm:px-8">
      <!-- Judul Utama -->
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">About CanEls Studio</h1>
        <p class="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
          Studio foto profesional yang mengabadikan momen-momen terbaik Anda dengan sentuhan artistik dan penuh makna.
        </p>
      </div>

      <!-- Grid Info -->
      <div class="grid md:grid-cols-2 gap-12 items-center mb-20">
        <!-- Teks -->
        <div class="space-y-6">
          <h2 class="text-2xl font-semibold">Filosofi Kami</h2>
          <p class="text-gray-600 leading-relaxed">
           CanEls Studio lahir dari kecintaan kami terhadap seni visual dan keinginan untuk menghadirkan karya yang
            tidak hanya indah, tapi juga bercerita. Kami percaya setiap foto menyimpan emosi, makna, dan kisah yang
            ingin diabadikan selamanya.
          </p>
          <ul class="list-disc list-inside text-gray-700">
            <li>Berbasis di kota kreatif dengan studio modern</li>
            <li>Fotografer profesional & berpengalaman</li>
            <li>Menggabungkan teknik klasik dan tren terbaru</li>
          </ul>
        </div>

        <!-- Foto -->
        <div class="relative group">
          <img
            src="/src/assets/studio-1.jpg"
            alt="Studio Interior"
            class="rounded-xl shadow-xl w-full object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
        </div>
      </div>

      <!-- Kenapa Memilih Kami -->
      <div class="mb-16">
        <h2 class="text-3xl font-semibold text-center mb-10">Kenapa Memilih Kami?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <h3 class="text-xl font-semibold mb-3">Kualitas Premium</h3>
            <p class="text-gray-600">Menggunakan peralatan fotografi terbaik untuk hasil yang tajam, jelas, dan profesional.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <h3 class="text-xl font-semibold mb-3">Layanan Personal</h3>
            <p class="text-gray-600">Setiap klien adalah prioritas. Kami menyesuaikan konsep sesuai kebutuhan dan karakter Anda.</p>
          </div>
          <div class="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition-all duration-300">
            <h3 class="text-xl font-semibold mb-3">Hasil yang Emosional</h3>
            <p class="text-gray-600">Kami tidak hanya memotret, tapi menciptakan karya yang menyentuh hati dan punya cerita.</p>
          </div>
        </div>
      </div>

      <!-- Mini Galeri -->
      <div>
        <h2 class="text-3xl font-semibold text-center mb-10">Suasana Studio Kami</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="(img, i) in miniGallery" :key="i" class="overflow-hidden rounded-lg">
            <img
              :src="img"
              alt="Mini Gallery"
              class="w-full h-40 object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  </LayoutPage>
</template>

<script setup>
import LayoutPage from '../../layouts/layout-cust/LayoutPage.vue'

import img13 from '../../assets/studio-2.jpg'
import img14 from '../../assets/studio-3.jpg'
import img4 from '../../assets/bayi-4.jpg'
import img5 from '../../assets/prewed-1.jpg'


const miniGallery = [img13, img14, img4, img5]
</script>
