<template>
  <LayoutPage>
    <!-- Filter Kategori -->
    <div
      class="px-4 py-6 sticky top-0 z-40 bg-pink-100 bg-opacity-100 backdrop-blur-md shadow-md"
    >
      <div class="title-wrapper justify-center">
  <h1 class="title-container typing-text">
    Our Gallery
    <img 
      :src="iconSlide" 
      alt="Camera Icon" 
      class="inline-block w-12 h-10 object-contain ml-2 align-middle drop-shadow"
    />
  </h1>
</div>

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
    <main class="flex-grow px-2 sm:px-4 py-10 max-w-7xl mx-auto">
      <transition-group
        :name="transitionName"
        tag="section"
        class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        :key="activeCategory"
      >
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.src"
          :style="{ ...getParallaxStyle(index), transitionDelay: index * 100 + 'ms' }"
          class="bg-white p-1 sm:p-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer break-inside-avoid gallery-item fade-item"
          @click="openModal(photo)"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="w-full h-auto rounded-md object-cover transition-all duration-500 ease-in-out hover:scale-105 hover:brightness-110"
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
        <div class="relative max-w-full max-h-screen rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
          <!-- Tombol panah kembali -->
          <button
            @click="selectedPhoto = null"
            class="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            :src="selectedPhoto.src"
            :alt="selectedPhoto.alt"
            class="max-w-full max-h-screen rounded-xl"
          />
        </div>
      </div>
    </transition>

    <!-- Favorites Catalog -->
    <div class="p-10 mt-16">
      <h1 class="text-3xl font-bold text-center mb-5 text-pink-500 font-mono">
        Favorites Catalog
      </h1>
      <p class="text-center mb-8">Pilih Frame Catalog Sesuai Dengan Mood Kamu</p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(frame, idx) in frames"
          :key="idx"
          :style="{
            animationDelay: idx * 150 + 'ms',
            background: pastelGradients[idx % pastelGradients.length],
          }"
          class="rounded-lg shadow-lg p-5 flex flex-col items-center hover:shadow-xl transition-all duration-300 catalog-item"
        >
          <h2 class="text-lg font-semibold text-center mb-2">Variasi Frame</h2>
          <p class="text-center mb-3">{{ frame.title }}</p>
          <img
            :src="frame.src"
            :alt="frame.title"
            class="object-contain w-full h-auto max-h-[250px] rounded-md shadow-sm mx-auto"
          />
        </div>
      </div>
    </div>
  </LayoutPage>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";
import LayoutPage from "../../layouts/layout-cust/LayoutPage.vue";

// Import gambar gallery
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

// Import gambar frames catalog
import Selfietime from "../../assets/frame-catalog-1.jpg";
import Collab from "../../assets/frame-catalog-2.jpg";
import License from "../../assets/frame-catalog-3.jpg";
import Season from "../../assets/frame-catalog-4.jpg";

// Import icon gif
import iconSlide from "../../assets/slide.gif";

// Gradien pastel untuk katalog
const pastelGradients = [
  "linear-gradient(135deg, #FFE4E1, #FFF0F5)",
  "linear-gradient(135deg, #E0FFFF, #F0FFF0)",
  "linear-gradient(135deg, #FFFACD, #FAFAD2)",
  "linear-gradient(135deg, #E6E6FA, #F8F8FF)",
];

// Frames Catalog
const frames = [
  { title: "Selfie Time", src: Selfietime },
  { title: "Collab Fanbase", src: Collab },
  { title: "License", src: License },
  { title: "Season", src: Season },
];

// Categories
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

// Parallax
const scrollY = ref(0);
function handleScroll() {
  scrollY.value = window.scrollY;
}
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
function getParallaxStyle(index) {
  const offset = (scrollY.value * 0.05 * ((index % 3) - 1)).toFixed(2);
  return { transform: `translateY(${offset}px)` };
}
</script>

<style scoped>
img {
  break-inside: avoid;
  border-radius: 0.5rem;
}

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

.catalog-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s ease forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
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
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

.gallery-item {
  will-change: transform;
}

.title-wrapper {
  padding-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.title-container {
  font-family: "Courier New", Courier, monospace;

  font-size: 3.5rem;
  color: #db2777; /* pink-600 */
  text-shadow: 2px 2px 4px rgba(219, 39, 119, 0.5), 0 0 10px rgba(219, 39, 119, 0.3);
  letter-spacing: 0.1em;
  user-select: none;
  margin: 0;
}

.typing-wrapper {
  width: fit-content;
  overflow: hidden;
  border-right: 3px solid #db2777;
  white-space: nowrap;
  animation: typing 3s steps(11) forwards, blink-caret 0.75s step-end infinite;
  margin: 0 auto;
  font-family: monospace;
  font-size: 3rem;
  color: #db2777;
  text-shadow: 2px 2px 4px rgba(219, 39, 119, 0.5), 0 0 10px rgba(219, 39, 119, 0.3);
  user-select: none;
}

/* typing effects */
.typing-text {
  font-family: "Courier New", Courier, monospace;
  color: #db2777;
  border-right: 3px solid #db2777;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  animation: typing 3s steps(31) forwards, blink-caret 0.75s step-end infinite;
}

/* Mobile */
@media (max-width: 640px) {
  .typing-text {
    font-size: 1.25rem; /* text-lg */
    animation: typing-sm 3s steps(20) forwards, blink-caret 0.75s step-end infinite;
  }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  .typing-text {
    font-size: 1.75rem; /* text-xl */
    animation: typing-md 3s steps(26) forwards, blink-caret 0.75s step-end infinite;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .typing-text {
    font-size: 2.5rem; /* text-4xl */
    animation: typing-lg 3s steps(31) forwards, blink-caret 0.75s step-end infinite;
  }
}

@keyframes typing-sm {
  from { width: 0; }
  to { width: 19ch; }
}
@keyframes typing-md {
  from { width: 0; }
  to { width: 26ch; }
}
@keyframes typing-lg {
  from { width: 0; }
  to { width: 17ch; }
}

@keyframes blink-caret {
  50% { border-color: transparent; }
}

button[aria-label="Close modal"] {
  cursor: pointer;
  box-shadow: 0 0 6px rgba(219, 39, 119, 0.5);
}
button[aria-label="Close modal"]:hover {
  box-shadow: 0 0 12px rgba(219, 39, 119, 0.8);
}
</style>
