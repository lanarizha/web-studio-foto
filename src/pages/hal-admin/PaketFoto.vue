<script setup>
import LayoutPage from "../../layouts/layout-admin/LayoutPage.vue";
import Button from "../../components/Button.vue";
import { ref, onMounted } from "vue";
import api from "../../services/api";

// Declare props to consume extraneous attributes passed from parent (e.g., RouterView)
defineProps(['user']);

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

// Daftar Icon yang Tersedia
const availableIcons = ref([
  { name: "Studio", src: iconStudio, label: "Studio Camera" },
  { name: "Family", src: iconFamily, label: "Big Family" },
  { name: "Prewedding", src: iconPrewed, label: "Wedding" },
  { name: "Baby", src: iconBaby, label: "Newborn" },
  { name: "Wide", src: iconWide, label: "Wide Camera" },
  { name: "High", src: iconHigh, label: "High Camera" },
  { name: "Form", src: iconForm, label: "Browser Cursor" },
]);

// State
const paketList = ref([]);

// Tambah Paket
const showTambahPaketModal = ref(false);
const newPaket = ref({
  nama_paket: "",
  deskripsi: "",
  harga: 0,
  fitur: [],
  foto: null,
  iconSrc: iconForm,
});
const fotoFile = ref(null);
const fotoPreview = ref(null);
const editPaketId = ref(null);
const fiturInput = ref("");

// Icon Selection States
const showIconSelector = ref(false);
const selectedIconSrc = ref(iconForm);

// Custom icon upload
const customIconFile = ref(null);

// --- API Calls ---
async function fetchPaketList() {
    try {
        const response = await api.get('/paket-foto');
        paketList.value = response.map(paket => ({
            ...paket,
            fitur: JSON.parse(paket.fitur || '[]'),
            // Assuming icon mapping is still needed, otherwise remove this too
            iconSrc: availableIcons.value.find(icon => icon.name.toLowerCase().includes(paket.nama_paket.split(' ')[1]?.toLowerCase()))?.src || iconForm,
        }));
    } catch (error) {
        console.error("Error fetching paket list:", error);
    }
}

// Tambah/Edit paket
async function tambahPaket() {
  if (!newPaket.value.nama_paket || !newPaket.value.deskripsi || !newPaket.value.harga) {
    alert("Nama, deskripsi, dan harga wajib diisi 💕");
    return;
  }

  const formData = new FormData();
  formData.append('nama_paket', newPaket.value.nama_paket);
  formData.append('deskripsi', newPaket.value.deskripsi);
  formData.append('harga', newPaket.value.harga);
  formData.append('fitur', JSON.stringify(newPaket.value.fitur));
  // formData.append('iconSrc', selectedIconSrc.value); // If you decide to save icons

  if (fotoFile.value) {
    formData.append('foto', fotoFile.value);
  }

  try {
    if (editPaketId.value) {
      formData.append('_method', 'PUT');
      await api.post(`/paket-foto/${editPaketId.value}`, formData);
    } else {
      await api.post('/paket-foto', formData);
    }
    alert('Paket foto berhasil disimpan!');
    fetchPaketList();
    showTambahPaketModal.value = false;
  } catch (error) {
    console.error("Error saving paket:", error);

    // Enhanced Error Handling
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // Laravel Validation Error
      if (status === 400 || status === 422) {
        let errorMessage = "Gagal menyimpan paket. Alasan:\n";
        if (data && typeof data === 'object') {
          for (const key in data) {
            if (Array.isArray(data[key])) {
              errorMessage += `- ${data[key].join(', ')}\n`;
            }
          }
          alert(errorMessage);
        }
      } 
      // Other Server Errors (e.g., 500)
      else {
        const message = data.message || 'Terjadi error di server, tapi tidak ada pesan spesifik.';
        alert(`Gagal menyimpan paket. Server merespon dengan status ${status}.\nDetail: ${message}`);
      }
    } 
    // Network Error or other issues
    else {
      alert("Gagal menyimpan paket. Periksa koneksi internet atau konfigurasi server Anda.");
    }
  }
}

// Edit & hapus paket
function editPaket(paket) {
  editPaketId.value = paket.id;
  newPaket.value = {
    nama_paket: paket.nama_paket,
    deskripsi: paket.deskripsi,
    harga: paket.harga,
    fitur: Array.isArray(paket.fitur) ? [...paket.fitur] : [],
    foto: paket.foto,
    iconSrc: paket.iconSrc,
  };
  fotoPreview.value = paket.foto; // Show existing image
  selectedIconSrc.value = paket.iconSrc || iconForm;
  showTambahPaketModal.value = true;
}

async function hapusPaket(id) {
  if (confirm("Yakin ingin menghapus paket ini?")) {
    try {
        await api.delete(`/paket-foto/${id}`);
        fetchPaketList();
    } catch (error) {
        console.error("Error deleting paket:", error);
        alert("Gagal menghapus paket.");
    }
  }
}

// --- Local UI Functions ---
// Upload gambar
function handleFotoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    fotoFile.value = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      fotoPreview.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Handle custom icon upload
function handleIconUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const validTypes = ["image/gif", "image/png", "image/jpg", "image/jpeg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Hanya file gambar (GIF, PNG, JPG, JPEG, WEBP) yang diperbolehkan!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const customIconSrc = event.target.result;
      selectedIconSrc.value = customIconSrc;
      newPaket.value.iconSrc = customIconSrc;

      const isExisting = availableIcons.value.some((icon) => icon.src === customIconSrc);
      if (!isExisting) {
        availableIcons.value.push({
          name: `Custom-${Date.now()}`,
          src: customIconSrc,
          label: `Custom Icon (${file.name})`,
        });
      }
      customIconFile.value = null;
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
    nama_paket: "",
    deskripsi: "",
    harga: 0,
    fitur: [],
    foto: null,
    iconSrc: iconForm,
  };
  fotoFile.value = null;
  fotoPreview.value = null;
  selectedIconSrc.value = iconForm;
  editPaketId.value = null;
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

// Load data awal
onMounted(() => {
  fetchPaketList();
});
</script>

<template>
  <LayoutPage>
    <!-- Paket List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
      <div
        v-for="(paket) in paketList"
        :key="paket.id"
        class="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition bg-white flex flex-col"
      >
        <!-- Gambar -->
        <img
          v-if="paket.foto"
          :src="paket.foto"
          class="w-full aspect-[16/9] object-cover"
        />
        <div v-else class="w-full aspect-[16/9] bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
        </div>

        <!-- Content -->
        <div class="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h4
              class="text-lg sm:text-xl font-semibold text-gray-800 mb-1 flex items-center gap-2 flex-wrap"
            >
              <span>{{ paket.nama_paket }}</span>
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
                @click="editPaket(paket)"
                text="Edit"
                text-color="#fff"
                background-color="#facc15"
              />
              <Button
                @click="hapusPaket(paket.id)"
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
            {{ editPaketId ? "Edit Paket" : "Tambah Paket" }}
            <img
              :src="editPaketId ? iconEdit : iconAdd"
              alt="icon"
              class="w-7 object-contain"
            />
          </h2>

          <div class="flex items-center gap-2">
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
        
        <!-- Upload Gambar -->
        <div class="mb-6">
          <label class="font-medium mb-2 block text-sm">Gambar Paket</label>
          <input 
            type="file" 
            accept="image/jpeg,image/png,image/jpg,image/gif"
            @change="handleFotoUpload"
            class="w-full text-sm border rounded px-2 py-1"
          />
          <div v-if="fotoPreview" class="mt-4">
            <img :src="fotoPreview" alt="Preview" class="w-full h-auto rounded-lg object-cover">
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Format: JPG, JPEG, PNG, GIF (Max 2MB)
          </p>
        </div>


        <!-- Info Paket -->
        <div class="mb-4 space-y-3">
          <div>
            <label class="font-medium mb-1 block text-sm">Nama Paket</label>
            <input
              v-model="newPaket.nama_paket"
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
            {{ editPaketId ? "Simpan Perubahan" : "Simpan Paket" }}
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
</style>