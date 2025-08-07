<template>
  <LayoutPage>
    <!-- <div class="min-h-screen flex flex-col bg-white text-gray-900 transition-colors duration-300"> -->

    <!-- Filter Kategori -->
    <div
      class="px-4 py-6 sticky top-0 z-40 bg-pink-100 bg-opacity/100 backdrop-blur-md shadow-md"
    >
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="changeCategory(cat)"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium border shadow-sm transition-all duration-300 ease-in-out',
            activeCategory === cat
              ? 'bg-blue-50 text-black border-gray-900 scale-105'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-200 hover:scale-105',
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Gallery -->
    <main class="flex-grow px-2 sm:px-4 py-6 max-w-7xl mx-auto">
      <transition-group
        :name="transitionName"
        tag="section"
        class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        :key="activeCategory"
      >
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.src"
          :style="{ transitionDelay: index * 100 + 'ms' }"
          :class="[
            'bg-white p-1 sm:p-2 rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer break-inside-avoid fade-item',
          ]"
          @click="openModal(photo)"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="w-full h-auto rounded-md object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            loading="lazy"
          />
        </div>
      </transition-group>
    </main>

    <!-- Modal -->
    <transition name="zoom">
      <div
        v-if="selectedPhoto"
        class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        @click.self="selectedPhoto = null"
      >
        <img
          :src="selectedPhoto.src"
          :alt="selectedPhoto.alt"
          class="max-w-full max-h-screen rounded-xl shadow-2xl transition-all duration-500 ease-in-out"
        />
      </div>
    </transition>

    <!-- </div> -->
  </LayoutPage>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import LayoutPage from "../../layouts/layout-cust/LayoutPage.vue";

// Import gambar
import img1 from "../../assets/bayi-1.jpg";
import img2 from "../../assets/bayi-2.jpg";
import img3 from "../../assets/bayi-3.webp";
import img4 from "../../assets/bayi-4.jpg";
import img5 from "../../assets/prewed-1.jpg";
import img6 from "../../assets/prewed-2.jpg";
import img7 from "../../assets/prewed-3.jpg";
import img8 from "../../assets/prewed-4.jpg";
import img9 from "../../assets/klg-1.png";
import img10 from "../../assets/klg-2.jpg";
import img11 from "../../assets/klg-3.webp";
import img12 from "../../assets/studio-1.jpg";
import img13 from "../../assets/studio-2.jpg";
import img14 from "../../assets/studio-3.jpg";
import img15 from "../../assets/wide-1.jpg";
import img16 from "../../assets/wide-2.jpg";
import img17 from "../../assets/wide-3.jpg";
import img18 from "../../assets/high-1.jpg";
import img19 from "../../assets/high-2.jpg";
import img20 from "../../assets/high-3.jpg";
import img21 from "../../assets/high-4.jpg";
import img22 from "../../assets/klg-4.jpeg";
import img23 from "../../assets/studio-4.webp";
import img24 from "../../assets/wide-4.jpg";

const categories = [
  "All Photos",
  "New Born",
  "Prewed",
  "Family",
  "Studio",
  "Wide Angle",
  "High Angle",
];
const activeCategory = ref("All Photos");
const previousCategory = ref(activeCategory.value);

const photos = [
  { src: img1, alt: "New Born 1", category: "New Born" },
  { src: img2, alt: "New Born 2", category: "New Born" },
  { src: img3, alt: "New Born 3", category: "New Born" },
  { src: img4, alt: "New Born 4", category: "New Born" },
  { src: img5, alt: "Prewed 1", category: "Prewed" },
  { src: img6, alt: "Prewed 2", category: "Prewed" },
  { src: img7, alt: "Prewed 3", category: "Prewed" },
  { src: img8, alt: "Prewed 4", category: "Prewed" },
  { src: img9, alt: "Family 1", category: "Family" },
  { src: img10, alt: "Family 2", category: "Family" },
  { src: img11, alt: "Family 3", category: "Family" },
  { src: img12, alt: "Studio 1", category: "Studio" },
  { src: img13, alt: "Studio 2", category: "Studio" },
  { src: img14, alt: "Studio 3", category: "Studio" },
  { src: img15, alt: "Wide 1", category: "Wide Angle" },
  { src: img16, alt: "Wide 2", category: "Wide Angle" },
  { src: img17, alt: "Wide 3", category: "Wide Angle" },
  { src: img18, alt: "High 1", category: "High Angle" },
  { src: img19, alt: "High 2", category: "High Angle" },
  { src: img20, alt: "High 3", category: "High Angle" },
  { src: img21, alt: "High 4", category: "High Angle" },
  { src: img22, alt: "Family 4", category: "Family" },
  { src: img23, alt: "Studio 4", category: "Studio" },
  { src: img24, alt: "Wide 4", category: "Wide Angle" },
];

const filteredPhotos = computed(() => {
  if (activeCategory.value === "All Photos") return photos;
  return photos.filter((photo) => photo.category === activeCategory.value);
});

const selectedPhoto = ref(null);

async function openModal(photo) {
  selectedPhoto.value = null;
  await nextTick();
  selectedPhoto.value = photo;
}

function changeCategory(cat) {
  previousCategory.value = activeCategory.value;
  activeCategory.value = cat;
}

const transitionName = computed(() => {
  const oldIndex = categories.indexOf(previousCategory.value);
  const newIndex = categories.indexOf(activeCategory.value);
  return newIndex > oldIndex ? "slide-left" : "slide-right";
});
</script>

<style scoped>
/* Hindari pemotongan kolom */
img {
  break-inside: avoid;
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

/* Fade zoom in per foto */
.fade-item {
  opacity: 0;
  transform: scale(0.95);
  animation: fadeZoomIn 0.5s ease forwards;
}

@keyframes fadeZoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Modal zoom */
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.4s ease;
}
.zoom-enter-from {
  opacity: 0;
  transform: scale(0.85);
}
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

/* Slide left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.6s ease;
  will-change: transform, opacity;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* Slide right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.6s ease;
  will-change: transform, opacity;
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

/* Hover tambahan */
img:hover {
  filter: brightness(1.05) saturate(1.1);
}
</style>
