<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import LayoutPage from "../../layouts/layout-cust/LayoutPage.vue"; 
import Button from "../../components/Button.vue"; // pastikan path sesuai

// Import icon gif
import iconStudio from "../../assets/studiocam.gif";
import iconFamily from "../../assets/big-family.gif";
import iconPrewed from "../../assets/wedding.gif";
import iconBaby from "../../assets/newborn.gif";
import iconWide from "../../assets/widecam.gif";
import iconHigh from "../../assets/highcam.gif";
import iconForm from "../../assets/browser-cursor.gif";
import iconCamera from "../../assets/camera.gif";

// Import gambar (pastikan file ada di folder assets)
import prewedImage1 from "../../assets/prewed-1.jpg";
import prewedImage2 from "../../assets/prewed-2.jpg";
import prewedImage3 from "../../assets/prewed-3.JPG";

import bayiImage1 from "../../assets/bayi-1.jpg";
import bayiImage2 from "../../assets/bayi-2.jpg";
import bayiImage3 from "../../assets/bayi-3.webp";

import klgImage1 from "../../assets/klg-1.png";
import klgImage2 from "../../assets/klg-2.jpg";
import klgImage3 from "../../assets/klg-3.webp";

import studioImage1 from "../../assets/studio-1.jpg";
import studioImage2 from "../../assets/studio-2.jpg";
import studioImage3 from "../../assets/studio-3.jpg";

import wideImage1 from "../../assets/wide-1.jpg";
import wideImage2 from "../../assets/wide-2.jpg";
import wideImage3 from "../../assets/wide-3.jpg";

import highImage1 from "../../assets/high-1.jpg";
import highImage2 from "../../assets/high-2.jpg";
import highImage3 from "../../assets/high-3.jpg";

// Default Paket List (sebagai fallback jika tidak ada data di localStorage)
const defaultPaketList = [
  {
    nama: "Prewedding",
    deskripsi: "Sesi foto prewedding romantis indoor/outdoor.",
    fitur: ["Durasi 4 jam", "30 foto edit", "Semua file dikirim"],
    harga: 1500000,
    iconSrc: iconPrewed,
    images: [prewedImage1, prewedImage2, prewedImage3],
  },
  {
    nama: "Baby / Newborn",
    deskripsi: "Momen pertama si kecil yang menggemaskan.",
    fitur: ["Durasi 2 jam", "15 foto edit", "Semua file dikirim"],
    harga: 600000,
    iconSrc: iconBaby,
    images: [bayiImage1, bayiImage2, bayiImage3],
  },
  {
    nama: "Family",
    deskripsi: "Abadikan momen bahagia bersama keluarga.",
    fitur: ["Durasi 3 jam", "20 foto edit", "Album cetak"],
    harga: 750000,
    iconSrc: iconFamily,
    images: [klgImage1, klgImage2, klgImage3],
  },
  {
    nama: "Studio",
    deskripsi: "Pemotretan profesional di dalam studio.",
    fitur: ["Durasi 2 jam", "15 foto edit", "Semua file dikirim"],
    harga: 500000,
    iconSrc: iconStudio,
    images: [studioImage1, studioImage2, studioImage3],
  },
  {
    nama: "Wide Outdoor",
    deskripsi: "Outdoor dengan pemandangan luas & natural.",
    fitur: ["Durasi 3 jam", "25 foto edit", "Semua file dikirim"],
    harga: 1200000,
    iconSrc: iconWide,
    images: [wideImage1, wideImage2, wideImage3],
  },
  {
    nama: "High Angle",
    deskripsi: "Drone & high cam untuk perspektif unik.",
    fitur: ["Durasi 2 jam", "15 foto edit", "Video pendek"],
    harga: 2000000,
    iconSrc: iconHigh,
    images: [highImage1, highImage2, highImage3],
  },
];

// Paket List reactive
const paketList = ref([]);

// Slideshow tiap paket
const currentSlideIndex = ref({});
const intervals = {};

// Function to initialize slideshow for all packages
function initializeSlideshow() {
  // Clear existing intervals
  Object.values(intervals).forEach(clearInterval);
  
  // Reset current slide index
  currentSlideIndex.value = {};
  
  // Initialize slideshow for each package
  paketList.value.forEach((paket, i) => {
    currentSlideIndex.value[i] = 0;
    if (paket.images && paket.images.length > 1) {
      intervals[i] = setInterval(() => {
        currentSlideIndex.value[i] =
          (currentSlideIndex.value[i] + 1) % paket.images.length;
      }, 3000);
    }
  });
}

// Function to load packages from localStorage or use defaults
function loadPaketList() {
  try {
    const savedPakets = localStorage.getItem("paketList");
    if (savedPakets) {
      const parsedPakets = JSON.parse(savedPakets);
      // Validate that the parsed data is an array and not empty
      if (Array.isArray(parsedPakets) && parsedPakets.length > 0) {
        // Process images for each package
        paketList.value = parsedPakets.map(paket => {
          // Ensure images is an array
          if (!paket.images || !Array.isArray(paket.images)) {
            paket.images = [];
          }
          
          // If no images available, add a placeholder or default image
          if (paket.images.length === 0) {
            // You can add a default image here or leave empty
            paket.images = [];
          }
          
          return paket;
        });
      } else {
        // If no valid data in localStorage, use defaults
        paketList.value = [...defaultPaketList];
        localStorage.setItem("paketList", JSON.stringify(defaultPaketList));
      }
    } else {
      // If no data in localStorage, use defaults and save them
      paketList.value = [...defaultPaketList];
      localStorage.setItem("paketList", JSON.stringify(defaultPaketList));
    }
  } catch (error) {
    console.error("Error loading paket list:", error);
    // Fallback to default packages
    paketList.value = [...defaultPaketList];
    localStorage.setItem("paketList", JSON.stringify(defaultPaketList));
  }
}

// Function to refresh data from localStorage (can be called periodically)
function refreshPaketData() {
  loadPaketList();
  initializeSlideshow();
}

// Booking
const showBookingModal = ref(false);
const formBooking = ref({ nama: "", tanggal: "", jam: "", paket: "", catatan: "" });
const formBookingError = ref("");
const bookingList = ref([]);
const kalenderTerpakai = ref([]);

function openBookingForm(paketNama) {
  formBooking.value = { nama: "", tanggal: "", jam: "", paket: paketNama, catatan: "" };
  formBookingError.value = "";
  showBookingModal.value = true;
  kalenderTerpakai.value = JSON.parse(localStorage.getItem("kalenderBookings") || "[]");
}

function submitBookingForm() {
  const { nama, tanggal, jam, paket } = formBooking.value;
  if (!nama || !tanggal || !jam || !paket) {
    formBookingError.value = "Semua field wajib diisi ya sayang~💕";
    return;
  }
  const kalenderKey = `${tanggal} ${jam}`;
  if (kalenderTerpakai.value.includes(kalenderKey)) {
    formBookingError.value = "Slot waktu ini sudah dibooking orang lain 🕒";
    return;
  }
  bookingList.value.push({ id: Date.now(), status: "Pending", ...formBooking.value });
  kalenderTerpakai.value.push(kalenderKey);
  localStorage.setItem("kalenderBookings", JSON.stringify(kalenderTerpakai.value));
  showBookingModal.value = false;
  alert("Booking berhasil disimpan!");
}

// Helper function to get image URL (handles both blob URLs and regular URLs)
function getImageUrl(imageSrc) {
  if (!imageSrc) return '';
  
  // If it's a blob URL or data URL, return as is
  if (imageSrc.startsWith('blob:') || imageSrc.startsWith('data:')) {
    return imageSrc;
  }
  
  // If it's a regular URL or imported asset, return as is
  return imageSrc;
}

// Load data on mount
onMounted(() => {
  loadPaketList();
  initializeSlideshow();
  
  // Load booking data
  const savedBooking = localStorage.getItem("bookingList");
  if (savedBooking) {
    bookingList.value = JSON.parse(savedBooking);
  }
  
  // Set up interval to check for updates from admin (optional)
  const refreshInterval = setInterval(() => {
    refreshPaketData();
  }, 5000); // Check every 5 seconds
  
  // Store interval ID to clear it later
  onBeforeUnmount(() => {
    clearInterval(refreshInterval);
  });
});

// Watch for changes in paketList and reinitialize slideshow
watch(paketList, () => {
  initializeSlideshow();
}, { deep: true });

// Cleanup intervals
onBeforeUnmount(() => {
  Object.values(intervals).forEach(clearInterval);
});

// Watch booking list changes
watch(
  bookingList,
  (value) => localStorage.setItem("bookingList", JSON.stringify(value)),
  { deep: true }
);
</script>

<template>
  <LayoutPage>
    <!-- Header -->
    <div class="px-4 py-6 sticky top-0 z-40 bg-pink-100 bg-opacity-100 backdrop-blur-md shadow-md">
      <div class="title-wrapper justify-center">
        <h1 class="text-shadow-amber-200 typing-text">
          Booking Studio In Here!
          <img 
            :src="iconCamera" 
            alt="Camera Icon" 
            class="inline-block w-12 h-10 object-contain ml-2 align-middle drop-shadow"
          />
        </h1>
      </div>
    </div>

    <!-- Paket List -->
    <div class="full-bg-container rounded-xl shadow p-6">
      <!-- Refresh Button (Optional - for manual refresh) -->
      <!-- <div class="mb-4 text-center">
        <button 
          @click="refreshPaketData"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          🔄 Refresh Paket
        </button>
      </div> -->

      <!-- No packages message -->
      <div v-if="paketList.length === 0" class="text-center py-8">
        <p class="text-gray-600 text-lg">Tidak ada paket tersedia saat ini.</p>
      </div>

      <!-- Packages Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(paket, index) in paketList"
          :key="`paket-${index}-${paket.nama}`"
          class="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 bg-white flex flex-col"
        >
          <!-- Image slideshow -->
          <div class="relative h-52 bg-gray-200 overflow-hidden rounded-t-2xl">
            <div v-if="paket.images && paket.images.length > 0" class="relative h-full">
              <transition name="slide-fade" mode="out-in">
                <img
                  :key="`img-${paket.images[currentSlideIndex[index]]}-${currentSlideIndex[index]}`"
                  :src="getImageUrl(paket.images[currentSlideIndex[index]])"
                  :alt="`${paket.nama} - Image ${currentSlideIndex[index] + 1}`"
                  class="w-full h-full object-cover"
                  @error="$event.target.style.display = 'none'"
                />
              </transition>
              
              <!-- Image counter -->
              <!-- <div v-if="paket.images.length > 1" class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                {{ (currentSlideIndex[index] || 0) + 1 }}/{{ paket.images.length }}
              </div> -->
            </div>
            
            <!-- Placeholder when no images -->
            <div v-else class="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              <div class="text-center">
                <div class="text-4xl mb-2">📷</div>
                <div class="text-sm">No Image Available</div>
              </div>
            </div>
          </div>

          <!-- Package content -->
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <span>{{ paket.nama }}</span>
                <img 
                  v-if="paket.iconSrc" 
                  :src="paket.iconSrc" 
                  alt="icon" 
                  class="w-8 h-8 object-contain" 
                />
              </h4>
              <p class="text-gray-600 text-sm mb-2">{{ paket.deskripsi }}</p>
              <ul v-if="paket.fitur && paket.fitur.length > 0" class="text-sm text-gray-500 list-disc pl-5 mb-3 space-y-1">
                <li v-for="(fitur, idx) in paket.fitur" :key="idx">{{ fitur }}</li>
              </ul>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-lg text-green-600 font-bold">
                Rp {{ (paket.harga || 0).toLocaleString() }}
              </span>
              <Button
                @click="openBookingForm(paket.nama)"
                text="Pesan"
                text-color="#3b3eff"
                background-color="#e6908a"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <transition name="modal-fade">
        <div
          v-if="showBookingModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fadeIn relative">
            <!-- Header -->
            <div class="bg-gradient-to-r from-pink-400 to-orange-400 p-5 flex items-center justify-between">
              <!-- Kiri: ikon form -->
              <div class="flex items-center gap-3">
                <img
                  :src="iconForm"
                  alt="icon form"
                  class="w-8 h-8 object-contain drop-shadow"
                />
                <h3 class="text-xl font-bold text-white">Form Booking</h3>
              </div>
            </div>

            <!-- Body -->
            <div class="p-6 space-y-4">
              <div class="flex items-center gap-3">
                <img
                  :src="paketList.find((p) => p.nama === formBooking.paket)?.iconSrc"
                  alt="icon paket"
                  class="w-8 h-8 object-contain"
                />
                <h4 class="text-lg font-semibold text-gray-800">
                  {{ formBooking.paket }}
                </h4>
              </div>
              <!-- Input -->
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
                <input
                  v-model="formBooking.nama"
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Tanggal Booking</label>
                <input
                  v-model="formBooking.tanggal"
                  type="date"
                  class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Pilih Jam</label>
                <select
                  v-model="formBooking.jam"
                  class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option disabled value="">Pilih Jam Disini</option>
                  <option
                    v-for="jam in [
                      '08:00',
                      '09:00',
                      '10:00',
                      '11:00',
                      '12:00',
                      '13:00',
                      '14:00',
                      '15:00',
                      '16:00',
                      '17:00',
                    ]"
                    :key="jam"
                    :disabled="kalenderTerpakai.includes(`${formBooking.tanggal} ${jam}`)"
                    :class="
                      kalenderTerpakai.includes(`${formBooking.tanggal} ${jam}`)
                        ? 'text-gray-400 line-through'
                        : ''
                    "
                  >
                    {{ jam }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Catatan</label>
                <textarea
                  v-model="formBooking.catatan"
                  placeholder="Tulis catatan tambahan (opsional)"
                  class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                ></textarea>
              </div>
              <p v-if="formBookingError" class="text-red-500 text-sm font-medium mt-1">
                {{ formBookingError }}
              </p>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3 px-6 py-4 bg-gray-50">
              <button
                @click="showBookingModal = false"
                class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                @click="submitBookingForm"
                class="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition shadow"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </LayoutPage>
</template>

<style>
.full-bg-container {
  min-height: 100vh;
  width: 100%;
  --s: clamp(60px, 8vw, 120px);
  --c-inner: #adf;
  --c-outer: skyblue;
  --c-outer2: white;
  background: radial-gradient(
    circle at 50% 99%,
    transparent 10%,
    var(--c-inner) 10% 30%,
    var(--c-outer) 30% 60%,
    var(--c-outer2) 60% 100%,
    transparent 100%
  );
  background-size: var(--s) var(--s);
  background-repeat: repeat;
  background-attachment: fixed;
  animation: move 5s infinite linear;
}

@keyframes move {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 0;
  }
}

/* Slide fade transition */
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-enter-from {
  transform: translateX(10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

/* Modal transition */
.modal-fade-enter-active {
  transition: opacity 0.3s ease;
}

.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Basic layout resets so page responsive */
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Container styling (kamu bisa pindahkan background ke body jika mau full bleed) */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Title area */
.title-wrapper {
  padding-left: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.title-container {
  font-family: "Courier New", Courier, monospace;
  font-size: 3.5rem;
  color: #db2777;
  text-shadow: 2px 2px 4px rgba(219, 39, 119, 0.5);
  letter-spacing: 0.1em;
  margin: 0;
  user-select: none;
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
  animation: typing 3s steps(31) forwards, blink-caret 0.75s step-end 4; /* caret kedip 4x */
}

@keyframes typing {
  from { width: 0; }
  to {
    width: 17ch;
    border-right: none; /* caret hilang */
  }
}

/* Mobile */
@media (max-width: 640px) {
  .typing-text {
    font-size: 1.10rem;
    animation: typing-sm 3s steps(20) forwards, blink-caret 0.75s step-end 4;
  }
}
@keyframes typing-sm {
  from { width: 0; }
  to { width: 40ch; border-right: none; }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  .typing-text {
    font-size: 1.75rem;
    animation: typing-md 3s steps(26) forwards, blink-caret 0.75s step-end 4;
  }
}
@keyframes typing-md {
  from { width: 0; }
  to { width: 26ch; border-right: none; }
}

/* Desktop */
@media (min-width: 1025px) {
  .typing-text {
    font-size: 2.5rem;
    animation: typing-lg 3s steps(31) forwards, blink-caret 0.75s step-end 4;
  }
}
@keyframes typing-lg {
  from { width: 0; }
  to { width: 27ch; border-right: none; }
}

@keyframes blink-caret {
  50% { border-color: transparent; }
}
</style>