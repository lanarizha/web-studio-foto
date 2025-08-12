<script setup>
import Button from "../../components/Button.vue";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import LayoutPage from "../../layouts/layout-cust/LayoutPage.vue";

// Import gambar
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

// Import icon gif
import iconStudio from "../../assets/studiocam.gif";
import iconFamily from "../../assets/big-family.gif";
import iconPrewed from "../../assets/wedding.gif";
import iconBaby from "../../assets/newborn.gif";
import iconWide from "../../assets/widecam.gif";
import iconHigh from "../../assets/highcam.gif";
import iconForm from "../../assets/browser-cursor.gif";

// Daftar paket
const paketList = ref([
  {
    iconSrc: iconStudio,
    nama: "Paket Studio",
    deskripsi: "Pemotretan di studio dengan lighting profesional.",
    fitur: ["30 Foto Digital", "Edit Warna", "Durasi 1 Jam"],
    harga: 500000,
    images: [studioImage1, studioImage2, studioImage3],
  },
  {
    iconSrc: iconFamily,
    nama: "Paket Keluarga",
    deskripsi: "Pemotretan Keluarga dengan tema bebas.",
    fitur: ["50 Foto Digital", "Gratis Transport Lokal", "Durasi 2 Jam"],
    harga: 800000,
    images: [klgImage1, klgImage2, klgImage3],
  },
  {
    iconSrc: iconPrewed,
    nama: "Paket Prewedding",
    deskripsi: "Paket khusus prewedding dengan properti dan lokasi khusus.",
    fitur: ["100 Foto Digital", "Makeup & Kostum", "Durasi 4 Jam"],
    harga: 2500000,
    images: [prewedImage1, prewedImage2, prewedImage3],
  },
  {
    iconSrc: iconBaby,
    nama: "Paket New Born",
    deskripsi: "Paket khusus new born untuk usia 0-12 bulan",
    fitur: ["12 foto edit & bonus kolase", "Kostum dan properti bayi", "Durasi 60 menit"],
    harga: 1500000,
    images: [bayiImage1, bayiImage2, bayiImage3],
  },
  {
    iconSrc: iconWide,
    nama: "Paket Wide Angle",
    deskripsi: "Foto wide angle diambil menggunakan lensa sudut lebar.",
    fitur: [
      "2 photo print strip",
      "All digital copies",
      "Durasi 15 menit",
      "max 6 orang",
    ],
    harga: 65000,
    images: [wideImage1, wideImage2, wideImage3],
  },
  {
    iconSrc: iconHigh,
    nama: "Paket High Angle",
    deskripsi: "Foto dari sudut tinggi di atas objek.",
    fitur: ["8 photo print", "All digital copies", "Durasi 25 menit", "max 6 orang"],
    harga: 250000,
    images: [highImage1, highImage2, highImage3],
  },
]);

// Booking
const formBookingIcon = ref("");
const currentSlideIndex = ref({});
const intervals = {};

paketList.value.forEach((paket, i) => {
  currentSlideIndex.value[i] = 0;
  if (paket.images.length > 1) {
    intervals[i] = setInterval(() => {
      currentSlideIndex.value[i] = (currentSlideIndex.value[i] + 1) % paket.images.length;
    }, 3000);
  }
});

onBeforeUnmount(() => {
  Object.values(intervals).forEach(clearInterval);
});

const showBookingModal = ref(false);
const formBooking = ref({
  nama: "",
  tanggal: "",
  jam: "",
  paket: "",
  catatan: "",
});
const formBookingError = ref("");
const bookingList = ref([]);
const kalenderTerpakai = ref([]);

onMounted(() => {
  const saved = localStorage.getItem("bookingList");
  if (saved) bookingList.value = JSON.parse(saved);
});

watch(
  bookingList,
  (value) => localStorage.setItem("bookingList", JSON.stringify(value)),
  { deep: true }
);

function openBookingForm(paketNama) {
  const paketDipilih = paketList.value.find(p => p.nama === paketNama);
  formBookingIcon.value = paketDipilih?.iconSrc || iconForm;
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
</script>

<template>
  <LayoutPage>
    <div class="rounded-xl shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(paket, index) in paketList"
          :key="index"
          class="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 bg-white flex flex-col"
        >
          <transition name="slide-fade" mode="out-in">
            <img
              :key="paket.images[currentSlideIndex[index]]"
              :src="paket.images[currentSlideIndex[index]]"
              class="w-full h-52 object-cover rounded-t-2xl"
            />
          </transition>
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2">
                <span>{{ paket.nama }}</span>
                <img :src="paket.iconSrc" alt="icon" class="w-8 h-8 object-contain" />
              </h4>
              <p class="text-gray-600 text-sm mb-2">{{ paket.deskripsi }}</p>
              <ul class="text-sm text-gray-500 list-disc pl-5 mb-3 space-y-1">
                <li v-for="(fitur, idx) in paket.fitur" :key="idx">{{ fitur }}</li>
              </ul>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-lg text-green-600 font-bold">Rp {{ paket.harga.toLocaleString() }}</span>
              <Button @click="openBookingForm(paket.nama)" text="Pesan" text-color="#3b3eff" background-color="#e6908a" />
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
    <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fadeIn">
      <!-- Header -->
      <div class="bg-gradient-to-r from-pink-400 to-orange-400 p-5 flex items-center gap-3">
        <img :src="iconForm" alt="icon form" class="w-8 h-8 object-contain drop-shadow" />
        <h3 class="text-xl font-bold text-white">Form Booking</h3>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-4">
        <div class="flex items-center gap-3">
          <img :src="formBookingIcon" alt="icon paket" class="w-8 h-8 object-contain" />
          <h4 class="text-lg font-semibold text-gray-800">{{ formBooking.paket }}</h4>
        </div>

        <!-- Input Nama -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
          <input 
            v-model="formBooking.nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Input Tanggal -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Tanggal Booking</label>
          <input 
            v-model="formBooking.tanggal"
            type="date"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Pilih Jam -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Pilih Jam</label>
          <select 
            v-model="formBooking.jam"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option disabled value="">Pilih Jam Disini</option>
            <option
              v-for="jam in ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00']"
              :key="jam"
              :disabled="kalenderTerpakai.includes(`${formBooking.tanggal} ${jam}`)"
              :class="kalenderTerpakai.includes(`${formBooking.tanggal} ${jam}`) ? 'text-gray-400 line-through' : ''"
            >
              {{ jam }}
            </option>
          </select>
        </div>

        <!-- Catatan -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Catatan</label>
          <textarea
            v-model="formBooking.catatan"
            placeholder="Tulis catatan tambahan (opsional)"
            class="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>

        <!-- Error -->
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
/* Transisi gambar */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Transisi modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
