<script setup>
import LayoutPage from "../../layouts/layout-admin/LayoutPage.vue";
import Button from "../../components/Button.vue";
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

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

// ✅ Default Paket
const defaultPaket = [
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
    deskripsi: "Pemotretan keluarga dengan tema bebas.",
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
    deskripsi: "Foto wide angle menggunakan lensa sudut lebar.",
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
    deskripsi: "Foto high angle diambil dari sudut di atas objek.",
    fitur: ["8 photo print", "All digital copies", "Durasi 25 menit", "max 6 orang"],
    harga: 250000,
    images: [highImage1, highImage2, highImage3],
  },
];

// ✅ State
const paketList = ref([]);
const currentSlideIndex = ref({});
const intervals = {};
const formBookingIcon = ref(iconForm);

// Booking
const showBookingModal = ref(false);
const formBooking = ref({ nama: "", tanggal: "", jam: "", paket: "", catatan: "" });
const formBookingError = ref("");
const bookingList = ref([]);
const kalenderTerpakai = ref([]);

// Tambah Paket
const showTambahPaketModal = ref(false);
const newPaket = ref({ nama: "", deskripsi: "", harga: 0, fitur: [], images: [] });
const editIndex = ref(null);
const fiturInput = ref("");

// Upload gambar
function handleImageUpload(e) {
  const files = e.target.files;
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => newPaket.value.images.push(event.target.result);
    reader.readAsDataURL(file);
  });
}

// Tambah/hapus fitur
function tambahFitur() {
  if (fiturInput.value.trim() !== "") {
    newPaket.value.fitur.push(fiturInput.value.trim());
    fiturInput.value = "";
  }
}
function hapusFitur(index) {
  newPaket.value.fitur.splice(index, 1);
}

// Tambah paket
function tambahPaket() {
  if (!newPaket.value.nama || !newPaket.value.deskripsi || !newPaket.value.harga) {
    alert("Semua field wajib diisi 💕");
    return;
  }
  const paketData = { ...newPaket.value, iconSrc: iconForm };
  if (editIndex.value !== null) {
    paketList.value.splice(editIndex.value, 1, paketData);
    editIndex.value = null;
  } else {
    paketList.value.push(paketData);
  }
  localStorage.setItem("paketList", JSON.stringify(paketList.value));
  showTambahPaketModal.value = false;
  newPaket.value = { nama: "", deskripsi: "", harga: 0, fitur: [], images: [] };
  nextTick(() => setupSlideshow());
}

// Edit & hapus paket/foto
function editPaket(index) {
  const paket = paketList.value[index];
  newPaket.value = { ...paket, fitur: [...paket.fitur], images: [...paket.images] };
  editIndex.value = index;
  showTambahPaketModal.value = true;
}
function hapusFoto(index) {
  if (confirm("Yakin ingin menghapus foto ini?")) newPaket.value.images.splice(index, 1);
}
function hapusPaket(index) {
  if (confirm("Yakin ingin menghapus paket ini?")) {
    paketList.value.splice(index, 1);
    localStorage.setItem("paketList", JSON.stringify(paketList.value));
    setupSlideshow();
  }
}

// Slideshow
function setupSlideshow() {
  Object.values(intervals).forEach(clearInterval);
  currentSlideIndex.value = paketList.value.map(() => 0);
  paketList.value.forEach((paket, i) => {
    if (paket.images && paket.images.length > 1) {
      intervals[i] = setInterval(
        () =>
          (currentSlideIndex.value[i] =
            (currentSlideIndex.value[i] + 1) % paket.images.length),
        3000
      );
    }
  });
}
onBeforeUnmount(() => Object.values(intervals).forEach(clearInterval));

// Load data awal
onMounted(() => {
  const saved = localStorage.getItem("paketList");
  paketList.value = saved ? JSON.parse(saved) : defaultPaket;
  localStorage.setItem("paketList", JSON.stringify(paketList.value));
  setupSlideshow();
  const savedBooking = localStorage.getItem("bookingList");
  if (savedBooking) bookingList.value = JSON.parse(savedBooking);
});

// Auto save booking
watch(
  bookingList,
  (value) => localStorage.setItem("bookingList", JSON.stringify(value)),
  { deep: true }
);

// Booking
function openBookingForm(paketNama) {
  const paketDipilih = paketList.value.find((p) => p.nama === paketNama);
  formBookingIcon.value = paketDipilih?.iconSrc || iconForm;

  formBooking.value = {
    nama: "",
    tanggal: "",
    jam: "",
    paket: paketNama,
    catatan: "",
  };

  formBookingError.value = "";
  showBookingModal.value = true;

  const kalenderList = JSON.parse(localStorage.getItem("kalenderBookings") || "[]");
  kalenderTerpakai.value = kalenderList;
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

  const newBooking = {
    id: Date.now(),
    status: "Pending",
    ...formBooking.value,
  };

  bookingList.value.push(newBooking);
  kalenderTerpakai.value.push(kalenderKey);
  localStorage.setItem("kalenderBookings", JSON.stringify(kalenderTerpakai.value));

  showBookingModal.value = false;
  alert("Booking berhasil disimpan!");
}
</script>

<template>
  <LayoutPage>
    <h1 class="text-3xl font-bold mb-6">Daftar Paket</h1>

    <div class="bg-white rounded-xl shadow p-4 sm:p-6">
      <!-- <div class="flex justify-end mb-4 text-xs">
        <Button
          @click="showTambahPaketModal = true"
          text="Tambah Paket"
          text-color="#fff"
          background-color="#3b82f6"
        />
      </div> -->
      <!-- Paket List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
        <div
          v-for="(paket, index) in paketList"
          :key="index"
          class="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition bg-white flex flex-col"
        >
          <!-- Gambar -->
          <img
            v-if="paket.images && paket.images.length"
            :src="paket.images[currentSlideIndex[index] || 0]"
            class="w-full aspect-[16/9] object-cover transition-all duration-700 ease-in-out"
          />

          <!-- Content -->
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h4
                class="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2 flex-wrap"
              >
                <span>{{ paket.nama }}</span>
                <img
                  :src="paket.iconSrc"
                  alt="icon"
                  class="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                />
              </h4>
              <p class="text-gray-600 text-sm sm:text-base mb-2">{{ paket.deskripsi }}</p>
              <ul class="text-sm text-gray-500 list-disc pl-5 mb-3 space-y-1">
                <li v-for="(fitur, idx) in paket.fitur" :key="idx">{{ fitur }}</li>
              </ul>
            </div>
            <div
              class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <span class="text-base sm:text-lg text-green-600 font-bold">
                Rp {{ paket.harga.toLocaleString() }}
              </span>
              <div class="flex flex-wrap gap-2">
                <Button
                  @click="openBookingForm(paket.nama)"
                  text="Pesan"
                  text-color="#fff"
                  background-color="#16a34a"
                />
                <Button
                  @click="editPaket(index)"
                  text="Edit"
                  text-color="#fff"
                  background-color="#facc15"
                />
                <Button
                  @click="hapusPaket(index)"
                  text="Hapus"
                  text-color="#fff"
                  background-color="#ef4444"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tambah/Edit Paket Modal -->
    <div
      v-if="showTambahPaketModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">
            {{ editIndex !== null ? "Edit Paket" : "Tambah Paket" }}
          </h2>
          <span
            v-if="editIndex !== null"
            class="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
            >Editing</span
          >
        </div>

        <!-- Info Paket -->
        <div class="mb-4 space-y-2">
          <input
            v-model="newPaket.nama"
            placeholder="Nama Paket"
            class="w-full border px-3 py-2 rounded"
          />
          <textarea
            v-model="newPaket.deskripsi"
            placeholder="Deskripsi"
            class="w-full border px-3 py-2 rounded"
          ></textarea>
          <input
            v-model.number="newPaket.harga"
            type="number"
            placeholder="Harga"
            class="w-full border px-3 py-2 rounded"
          />
        </div>

        <!-- Fitur -->
        <div class="mb-4">
          <label class="font-medium mb-1 block">Fitur Paket</label>
          <div class="flex gap-2 mb-2">
            <input
              v-model="fiturInput"
              placeholder="Tambah fitur"
              class="flex-1 border px-3 py-2 rounded"
            />
            <button
              @click="tambahFitur"
              class="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              Tambah
            </button>
          </div>
          <ul class="list-disc list-inside space-y-1">
            <li
              v-for="(fitur, i) in newPaket.fitur"
              :key="i"
              class="flex justify-between items-center"
            >
              {{ fitur }}
              <button @click="hapusFitur(i)" class="text-red-500 font-bold">x</button>
            </li>
          </ul>
        </div>

        <!-- Upload Gambar -->
        <div class="mb-4">
          <label class="font-medium mb-1 block">Gambar Paket</label>
          <input type="file" multiple @change="handleImageUpload" class="mb-2" />
          <div class="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            <div v-for="(img, i) in newPaket.images" :key="i" class="relative">
              <img :src="img" class="w-full h-20 object-cover rounded" />
              <button
                @click="hapusFoto(i)"
                class="absolute top-1 right-1 bg-red-500 text-white px-1 rounded text-xs"
              >
                x
              </button>
            </div>
          </div>
        </div>

        <!-- Tombol -->
        <div class="flex justify-end gap-2 mt-4">
          <button
            @click="showTambahPaketModal = false"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            @click="tambahPaket"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {{ editIndex !== null ? "Simpan Perubahan" : "Simpan" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div
      v-if="showBookingModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto relative">
        <button
          @click="showBookingModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div class="flex items-center gap-3 mb-4">
          <img :src="formBookingIcon" alt="icon" class="w-10 h-10 object-contain" />
          <h2 class="text-xl font-semibold">Form Booking</h2>
        </div>

        <!-- Error -->
        <p v-if="formBookingError" class="text-red-500 text-sm mb-3">
          {{ formBookingError }}
        </p>

        <!-- Form Input -->
        <div class="space-y-3">
          <input
            v-model="formBooking.nama"
            placeholder="Nama Lengkap"
            class="w-full border px-3 py-2 rounded"
          />
          <input
            v-model="formBooking.tanggal"
            type="date"
            class="w-full border px-3 py-2 rounded"
          />
          <input
            v-model="formBooking.jam"
            type="time"
            class="w-full border px-3 py-2 rounded"
          />
          <input
            v-model="formBooking.paket"
            placeholder="Paket"
            class="w-full border px-3 py-2 rounded bg-gray-100"
            readonly
          />
          <textarea
            v-model="formBooking.catatan"
            placeholder="Catatan tambahan"
            class="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <!-- Jadwal Terpakai -->
        <div v-if="kalenderTerpakai.length" class="mt-4">
          <h3 class="text-sm font-medium mb-2">Slot yang sudah terisi:</h3>
          <ul
            class="list-disc list-inside text-sm text-gray-500 max-h-24 overflow-y-auto"
          >
            <li v-for="(slot, i) in kalenderTerpakai" :key="i">{{ slot }}</li>
          </ul>
        </div>

        <!-- Tombol -->
        <div class="flex justify-end gap-2 mt-5">
          <button
            @click="showBookingModal = false"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            @click="submitBookingForm"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Simpan Booking
          </button>
        </div>
      </div>
    </div>

    <!-- Tambah Paket Button -->
    <button
      @click="showTambahPaketModal = true"
      class="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
    >
      + Tambah Paket
    </button>
  </LayoutPage>
</template>
