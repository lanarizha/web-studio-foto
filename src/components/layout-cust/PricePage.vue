<template>
  
    <section class="p-4">
    <template>
  <div class="bg-white rounded-xl shadow p-6">
    <h3 class="text-2xl font-bold text-indigo-700 mb-6 text-center">📸 Daftar Paket Foto</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(paket, index) in paketList"
        :key="index"
        class="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 bg-white flex flex-col"
      >
        <!-- SLIDER GAMBAR -->
        <div class="relative group">
          <img
            :src="paket.images[currentSlideIndex[index]]"
            alt="Foto Paket"
            class="w-full h-52 object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
          />
        </div>

        <!-- DETAIL -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4 class="text-xl font-semibold text-gray-800 mb-1">{{ paket.nama }}</h4>
            <p class="text-gray-600 text-sm mb-2">{{ paket.deskripsi }}</p>
            <ul class="text-sm text-gray-500 list-disc pl-5 mb-3 space-y-1">
              <li v-for="(fitur, idx) in paket.fitur" :key="idx">{{ fitur }}</li>
            </ul>
          </div>

          <!-- HARGA + TOMBOL -->
          <div class="mt-4 flex items-center justify-between">
            <span class="text-lg text-green-600 font-bold">Rp {{ paket.harga.toLocaleString() }}</span>
            <!-- <a
              :href="`https://wa.me/6281234567890?text=Halo, saya mau pesan ${paket.nama}`"
              target="_blank"
              class="bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-full hover:bg-indigo-700 transition"
            > -->
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>


      <PriceList />
    </section>
  
</template>

<script setup>
import PriceList from '../hal-cust/PriceList.vue'
import LayoutPage from '../layout-cust/LayoutPage.vue' // perbaiki path jika folder diganti ke layout/

</script>
