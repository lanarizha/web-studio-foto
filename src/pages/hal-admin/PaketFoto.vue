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
import iconX from "../../assets/x.gif";
import iconEdit from "../../assets/edit.gif";
import iconAdd from "../../assets/add.gif";

// ✅ Daftar Icon yang Tersedia
const availableIcons = ref([
  { name: "Studio", src: iconStudio, label: "Studio Camera" },
  { name: "Family", src: iconFamily, label: "Big Family" },
  { name: "Prewedding", src: iconPrewed, label: "Wedding" },
  { name: "Baby", src: iconBaby, label: "Newborn" },
  { name: "Wide", src: iconWide, label: "Wide Camera" },
  { name: "High", src: iconHigh, label: "High Camera" },
  { name: "Form", src: iconForm, label: "Browser Cursor" },
]);

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
const newPaket = ref({
  nama: "",
  deskripsi: "",
  harga: 0,
  fitur: [],
  images: [],
  iconSrc: iconForm, // Default icon
});
const editIndex = ref(null);
const fiturInput = ref("");

// Icon Selection States
const showIconSelector = ref(false);
const selectedIconSrc = ref(iconForm);

// Custom icon upload
const customIconFile = ref(null);

// Upload gambar
function handleImageUpload(e) {
  const files = e.target.files;
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => newPaket.value.images.push(event.target.result);
    reader.readAsDataURL(file);
  });
}

// Handle custom icon upload
function handleIconUpload(e) {
  const file = e.target.files[0];
  if (file) {
    // Validate file type
    const validTypes = [
      "image/gif",
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      alert("Hanya file gambar (GIF, PNG, JPG, JPEG, WEBP) yang diperbolehkan!");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const customIconSrc = event.target.result;
      selectedIconSrc.value = customIconSrc;
      newPaket.value.iconSrc = customIconSrc;

      // Add to available icons list if it's a new custom icon
      const isExisting = availableIcons.value.some((icon) => icon.src === customIconSrc);
      if (!isExisting) {
        availableIcons.value.push({
          name: `Custom-${Date.now()}`,
          src: customIconSrc,
          label: `Custom Icon (${file.name})`,
        });
      }

      customIconFile.value = null; // Reset file input
    };
    reader.readAsDataURL(file);
  }
}

// Select icon
function selectIcon(iconSrc) {
  selectedIconSrc.value = iconSrc;
  newPaket.value.iconSrc = iconSrc;
  showIconSelector.value = false;
}

// Reset form
function resetForm() {
  newPaket.value = {
    nama: "",
    deskripsi: "",
    harga: 0,
    fitur: [],
    images: [],
    iconSrc: iconForm,
  };
  selectedIconSrc.value = iconForm;
  editIndex.value = null;
  fiturInput.value = "";
  customIconFile.value = null;
}

// Open add/edit modal
function openTambahPaketModal() {
  resetForm();
  showTambahPaketModal.value = true;
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
    alert("Nama, deskripsi, dan harga wajib diisi 💕");
    return;
  }

  if (!newPaket.value.iconSrc) {
    newPaket.value.iconSrc = iconForm; // Default icon if none selected
  }

  const paketData = { ...newPaket.value };

  if (editIndex.value !== null) {
    paketList.value.splice(editIndex.value, 1, paketData);
    editIndex.value = null;
  } else {
    paketList.value.push(paketData);
  }

  localStorage.setItem("paketList", JSON.stringify(paketList.value));
  showTambahPaketModal.value = false;
  resetForm();
  nextTick(() => setupSlideshow());
}

// Edit & hapus paket/foto
function editPaket(index) {
  const paket = paketList.value[index];
  newPaket.value = {
    ...paket,
    fitur: [...paket.fitur],
    images: [...paket.images],
  };
  selectedIconSrc.value = paket.iconSrc || iconForm;
  editIndex.value = index;
  showTambahPaketModal.value = true;
}

function hapusFoto(index) {
  if (confirm("Yakin ingin menghapus foto ini?")) {
    newPaket.value.images.splice(index, 1);
  }
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

// Booking functions
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

    <!-- Tambah/Edit Paket Modal -->
    <div
      v-if="showTambahPaketModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            {{ editIndex !== null ? "Edit Paket" : "Tambah Paket" }}
            <img
              :src="editIndex !== null ? iconEdit : iconAdd"
              alt="icon"
              class="w-7 object-contain"
            />
          </h2>

          <div class="flex items-center gap-2">
            <!-- <span
            v-if="editIndex !== null"
            class="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded"
          >
            Editing
          </span> -->
            <button
              @click="showTambahPaketModal = false"
              class="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              <img :src="iconX" alt="Tutup" class="w-8 h-8 object-contain" />
            </button>
          </div>
        </div>

        <!-- Icon Selection -->
        <div class="mb-4">
          <label class="font-medium mb-2 block">Icon Paket</label>
          <div class="flex items-center gap-3 mb-2">
            <div class="flex items-center gap-2">
              <img
                :src="selectedIconSrc"
                alt="Selected Icon"
                class="w-10 h-10 object-contain border rounded p-1"
              />
              <span class="text-sm text-gray-600">Icon terpilih</span>
            </div>
            <button
              @click="showIconSelector = !showIconSelector"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              {{ showIconSelector ? "Tutup" : "Pilih Icon" }}
            </button>
          </div>

          <!-- Icon Selector -->
          <div v-if="showIconSelector" class="border rounded p-3 bg-gray-50">
            <h4 class="font-medium mb-2 text-sm">Icon Tersedia:</h4>
            <div class="grid grid-cols-4 gap-2 mb-3">
              <div
                v-for="icon in availableIcons"
                :key="icon.name"
                @click="selectIcon(icon.src)"
                class="border rounded p-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition flex flex-col items-center"
                :class="
                  selectedIconSrc === icon.src
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-white'
                "
              >
                <img
                  :src="icon.src"
                  :alt="icon.label"
                  class="w-8 h-8 object-contain mb-1"
                />
                <span class="text-xs text-gray-600 text-center">{{
                  icon.label.split(" ")[0]
                }}</span>
              </div>
            </div>

            <!-- Custom Icon Upload -->
            <div class="border-t pt-3">
              <label class="font-medium mb-1 block text-sm">Upload Icon Kustom:</label>
              <input
                type="file"
                accept="image/*"
                @change="handleIconUpload"
                class="w-full text-sm border rounded px-2 py-1"
                ref="customIconFile"
              />
              <p class="text-xs text-gray-500 mt-1">
                Format: GIF, PNG, JPG, JPEG, WEBP (Max 2MB)
              </p>
            </div>
          </div>
        </div>

        <!-- Info Paket -->
        <div class="mb-4 space-y-3">
          <div>
            <label class="font-medium mb-1 block text-sm">Nama Paket</label>
            <input
              v-model="newPaket.nama"
              placeholder="Contoh: Paket Wedding Premium"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="font-medium mb-1 block text-sm">Deskripsi</label>
            <textarea
              v-model="newPaket.deskripsi"
              placeholder="Deskripsi detail tentang paket ini..."
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label class="font-medium mb-1 block text-sm">Harga (Rp)</label>
            <input
              v-model.number="newPaket.harga"
              type="number"
              placeholder="1500000"
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Fitur -->
        <div class="mb-4">
          <label class="font-medium mb-2 block text-sm">Fitur Paket</label>
          <div class="flex gap-2 mb-3">
            <input
              v-model="fiturInput"
              placeholder="Contoh: 30 Foto Digital"
              class="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keyup.enter="tambahFitur"
            />
            <button
              @click="tambahFitur"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              Tambah
            </button>
          </div>
          <div v-if="newPaket.fitur.length > 0" class="space-y-2">
            <div
              v-for="(fitur, i) in newPaket.fitur"
              :key="i"
              class="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
            >
              <span class="text-sm">{{ fitur }}</span>
              <button
                @click="hapusFitur(i)"
                class="text-red-500 hover:text-red-700 font-bold text-sm ml-2"
              >
                <img :src="iconX" alt="Tutup" class="w-5 h-6 object-contain" />
              </button>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500 italic">Belum ada fitur ditambahkan</p>
        </div>

        <!-- Upload Gambar -->
        <div class="mb-6">
          <label class="font-medium mb-2 block text-sm">Gambar Paket</label>
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleImageUpload"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <div v-if="newPaket.images.length > 0">
            <div class="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
              <div v-for="(img, i) in newPaket.images" :key="i" class="relative group">
                <img :src="img" class="w-full h-20 object-cover rounded border" />
                <button
                  @click="hapusFoto(i)"
                  class="absolute -top-2 -right-2 text-white rounded-full w-6 h-6 text-xs font-bold hover: opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <img :src="iconX" alt="Tutup" class="w-5 h-6 object-contain" />
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500 italic">Belum ada gambar ditambahkan</p>
        </div>

        <!-- Tombol -->
        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="showTambahPaketModal = false"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Batal
          </button>
          <button
            @click="tambahPaket"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            {{ editIndex !== null ? "Simpan Perubahan" : "Simpan Paket" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div
      v-if="showBookingModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
    >
      <div
        class="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative"
      >
        <button
          @click="showBookingModal = false"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          ×
        </button>

        <div class="flex items-center gap-3 mb-4">
          <img :src="formBookingIcon" alt="icon" class="w-10 h-10 object-contain" />
          <h2 class="text-xl font-semibold">Form Booking</h2>
        </div>

        <!-- Error -->
        <p
          v-if="formBookingError"
          class="text-red-500 text-sm mb-3 bg-red-50 p-2 rounded"
        >
          {{ formBookingError }}
        </p>

        <!-- Form Input -->
        <div class="space-y-3">
          <input
            v-model="formBooking.nama"
            placeholder="Nama Lengkap"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="formBooking.tanggal"
            type="date"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="formBooking.jam"
            type="time"
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        <!-- Jadwal Terpakai -->
        <div v-if="kalenderTerpakai.length" class="mt-4">
          <h3 class="text-sm font-medium mb-2">Slot yang sudah terisi:</h3>
          <ul
            class="list-disc list-inside text-sm text-gray-500 max-h-24 overflow-y-auto bg-gray-50 p-2 rounded"
          >
            <li v-for="(slot, i) in kalenderTerpakai" :key="i">{{ slot }}</li>
          </ul>
        </div>

        <!-- Tombol -->
        <div class="flex justify-end gap-3 mt-6">
          <button
            @click="showBookingModal = false"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Batal
          </button>
          <button
            @click="submitBookingForm"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Simpan Booking
          </button>
        </div>
      </div>
    </div>

    <!-- Tambah Paket Button -->
    <button
      @click="openTambahPaketModal"
      class="fixed bottom-6 right-6 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
    >
      + Tambah Paket
    </button>
  </LayoutPage>
</template>

<style scoped>
/* Custom scrollbar untuk overflow areas */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Hover effects untuk icon selection */
.icon-selector-item {
  transition: all 0.2s ease;
}

.icon-selector-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Selected icon highlight */
.icon-selected {
  box-shadow: 0 0 0 2px #3b82f6;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 2px #3b82f6;
  }
  50% {
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  }
}

/* Form focus states */
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Modal animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Button hover effects */
.btn-primary {
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Image preview hover effects */
.image-preview {
  transition: transform 0.2s ease;
}

.image-preview:hover {
  transform: scale(1.05);
}

/* Loading state untuk upload */
.upload-loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive improvements */
@media (max-width: 640px) {
  .modal-container {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }

  .icon-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .btn-group {
    flex-direction: column;
    gap: 0.5rem;
  }
}

/* Tooltip styles */
.tooltip {
  position: relative;
}

.tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 1000;
}

.tooltip:hover::before {
  opacity: 1;
}

/* Error message styling */
.error-message {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-left: 4px solid #ef4444;
}

/* Success message styling */
.success-message {
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  border-left: 4px solid #22c55e;
}

/* Form field focus ring */
.form-field:focus-within {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  border-radius: 0.375rem;
}

/* Custom file input styling */
.file-input {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.file-input input[type="file"] {
  position: absolute;
  left: -9999px;
}

.file-input-label {
  cursor: pointer;
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 2px dashed #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
}

.file-input-label:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.file-input-label.dragover {
  background: #dbeafe;
  border-color: #3b82f6;
}
</style>
