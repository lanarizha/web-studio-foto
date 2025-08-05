<template>
  <LayoutPage>
    <div class="min-h-screen flex flex-col bg-white text-gray-900">
      
      <!-- Filter Kategori -->
      <div class="px-4 py-4">
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium border transition',
              activeCategory === cat
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Gallery -->
      <main class="flex-grow px-4 py-6 max-w-7xl mx-auto">
        <section class="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
          <div
            v-for="(photo, index) in filteredPhotos"
            :key="index"
            class="w-full overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            @click="openModal(photo)"
          >
            <img
              :src="photo.src"
              :alt="photo.alt"
              class="w-full mb-0 object-cover rounded transition-transform duration-300 ease-in-out hover:scale-105"
              loading="lazy"
            />
          </div>
        </section>
      </main>

      <!-- Image Modal -->
      <div
        v-if="selectedPhoto"
        class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        @click.self="selectedPhoto = null"
      >
        <img
          :src="selectedPhoto.src"
          :alt="selectedPhoto.alt"
          class="max-w-full max-h-screen rounded shadow-lg transition-all duration-300"
        />
      </div>

      <!-- Footer -->
      <footer class="border-t border-gray-200 py-6 text-center text-gray-500 text-sm font-sans">
        © 2024 Se/f Studios. All rights reserved.
      </footer>
    </div>
  </LayoutPage>
</template>

<script setup>
import { ref, computed } from 'vue'
import LayoutPage from '../layout-cust/LayoutPage.vue'

// Import gambar dari assets
import img1 from '../../assets/bayi-1.jpg'
import img2 from '../../assets/bayi-2.jpg'
import img3 from '../../assets/bayi-3.webp'
import img4 from '../../assets/bayi-4.jpg'
import img5 from '../../assets/prewed-1.jpg'
import img6 from '../../assets/prewed-2.jpg'
import img7 from '../../assets/prewed-3.jpg'
import img8 from '../../assets/prewed-4.jpg'
import img9 from '../../assets/klg-1.png'
import img10 from '../../assets/klg-2.jpg'
import img11 from '../../assets/klg-3.webp'
import img12 from '../../assets/studio-1.jpg'
import img13 from '../../assets/studio-2.jpg'
import img14 from '../../assets/studio-3.jpg'
import img15 from '../../assets/wide-1.jpg'
import img16 from '../../assets/wide-2.jpg'
import img17 from '../../assets/wide-3.jpg'
import img18 from '../../assets/high-1.jpg'
import img19 from '../../assets/high-2.jpg'
import img20 from '../../assets/high-3.jpg'

const categories = ['Semua', 'Bayi', 'Prewed', 'Keluarga', 'Studio', 'Wide Angle', 'High Angle']
const activeCategory = ref('Semua')

const photos = [
  { src: img1, alt: 'Galeri Foto 1', category: 'Bayi' },
  { src: img2, alt: 'Galeri Foto 2', category: 'Bayi' },
  { src: img3, alt: 'Galeri Foto 3', category: 'Bayi' },
  { src: img4, alt: 'Galeri Foto 4', category: 'Bayi' },
  { src: img5, alt: 'Galeri Foto 5', category: 'Prewed' },
  { src: img6, alt: 'Galeri Foto 6', category: 'Prewed' },
  { src: img7, alt: 'Galeri Foto 7', category: 'Prewed' },
  { src: img8, alt: 'Galeri Foto 8', category: 'Prewed' },
  { src: img9, alt: 'Galeri Foto 9', category: 'Keluarga' },
  { src: img10, alt: 'Galeri Foto 10', category: 'Keluarga' },
  { src: img11, alt: 'Galeri Foto 11', category: 'Keluarga' },
  { src: img12, alt: 'Galeri Foto 12', category: 'Studio' },
  { src: img13, alt: 'Galeri Foto 13', category: 'Studio' },
  { src: img14, alt: 'Galeri Foto 14', category: 'Studio' },
  { src: img15, alt: 'Galeri Foto 15', category: 'Wide Angle' },
  { src: img16, alt: 'Galeri Foto 16', category: 'Wide Angle' },
  { src: img17, alt: 'Galeri Foto 17', category: 'Wide Angle' },
  { src: img18, alt: 'Galeri Foto 18', category: 'High Angle' },
  { src: img19, alt: 'Galeri Foto 19', category: 'High Angle' },
  { src: img20, alt: 'Galeri Foto 20', category: 'High Angle' },
]

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'Semua') return photos
  return photos.filter((photo) => photo.category === activeCategory.value)
})

const selectedPhoto = ref(null)
function openModal(photo) {
  selectedPhoto.value = photo
}
</script>

<style scoped>
img {
  break-inside: avoid;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}
</style>
