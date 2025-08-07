<template>
  <LayoutPage>
    <section
      class="text-gray-800 min-h-screen py-16 px-4 sm:px-10 font-comic bg-transparent"
    >
      <!-- Judul Utama -->
      <div class="text-center mb-14 animate-fade-in-down">
        <h1
          class="text-4xl sm:text-5xl font-extrabold text-pink-500 mb-3 leading-tight tracking-tight"
        >
          About CanEls Studio
        </h1>
        <div
          class="bg-purple-100/40 p-6 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 max-w-2xl mx-auto"
        >
          <p class="text-purple-600 text-lg sm:text-xl">
            Studio foto profesional yang mengabadikan momen-momen terbaik Anda dengan
            sentuhan artistik dan penuh makna.
          </p>
        </div>
      </div>

      <!-- Filosofi -->
      <div class="grid md:grid-cols-2 gap-14 items-center mb-24 animate-fade-in">
        <!-- Teks -->
        <div class="space-y-6 text-gray-700">
          <h2 class="text-3xl font-bold text-center text-pink-400 mb-3">Filosofi Kami</h2>
          <div
            class="bg-pink-100/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
          >
            <p class="leading-relaxed mb-4 text-purple-700">
              CanEls Studio lahir dari kecintaan kami terhadap seni visual dan keinginan
              untuk menghadirkan karya yang tidak hanya indah, tapi juga bercerita.
            </p>
            <ul class="list-disc list-inside text-purple-600 text-left">
              <li>Berbasis di kota kreatif dengan studio modern</li>
              <li>Fotografer profesional & berpengalaman</li>
              <li>Menggabungkan teknik klasik dan tren terbaru</li>
            </ul>
          </div>
        </div>

        <!-- Foto -->
        <div class="relative group">
          <img
            src="/src/assets/studio-1.jpg"
            alt="Studio Interior"
            class="rounded-3xl shadow-lg shadow-pink-200 w-full object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-pink-200/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
        </div>
      </div>

      <!-- Kenapa Memilih Kami -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-center text-purple-500 mb-10">
          Kenapa Memilih Kami?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="bg-pink-100/60 p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center"
          >
            <h3 class="text-xl font-bold text-pink-500 mb-3">Kualitas Premium</h3>
            <p class="text-gray-700">
              Peralatan terbaik untuk hasil tajam, jelas, dan profesional.
            </p>
          </div>
          <div
            class="bg-purple-100/60 p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center"
          >
            <h3 class="text-xl font-bold text-purple-500 mb-3">Layanan Personal</h3>
            <p class="text-gray-700">
              Konsep disesuaikan dengan karakter dan kebutuhan Anda.
            </p>
          </div>
          <div
            class="bg-blue-100/60 p-6 rounded-xl shadow-md hover:scale-105 transition-all duration-300 text-center"
          >
            <h3 class="text-xl font-bold text-blue-500 mb-3">Hasil yang Emosional</h3>
            <p class="text-gray-700">
              Kami menciptakan karya yang menyentuh dan bermakna.
            </p>
          </div>
        </div>
      </div>

      <!-- Mini Galeri -->
      <div class="animate-fade-in-up">
        <h2 class="text-3xl font-bold text-center text-pink-500 mb-10">
          Suasana Studio Kami
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          <div
            v-for="(img, i) in miniGallery"
            :key="i"
            class="overflow-hidden rounded-2xl shadow-md shadow-purple-200 hover:shadow-lg transition-all duration-300"
          >
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
import LayoutPage from "../../layouts/layout-cust/LayoutPage.vue";

import img13 from "../../assets/studio-2.jpg";
import img14 from "../../assets/studio-3.jpg";
import img4 from "../../assets/bayi-4.jpg";
import img5 from "../../assets/prewed-1.jpg";

const miniGallery = [img13, img14, img4, img5];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap");

.font-comic {
  font-family: "Comic Neue", cursive;
}

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
