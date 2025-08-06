<script setup>
import LayoutPage from '../../layouts/layout-admin/LayoutPage.vue' // perbaiki path jika folder diganti ke layout/
import Button from '../../components/Button.vue'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

// Import gambar dari folder assets
import prewedImage1 from '../../assets/prewed-1.jpg'
import prewedImage2 from '../../assets/prewed-2.jpg'
import prewedImage3 from '../../assets/prewed-3.JPG'  // pastikan nama file cocok

import bayiImage1 from '../../assets/bayi-1.jpg'
import bayiImage2 from '../../assets/bayi-2.jpg'
import bayiImage3 from '../../assets/bayi-3.webp'

import klgImage1 from '../../assets/klg-1.png'
import klgImage2 from '../../assets/klg-2.jpg'
import klgImage3 from '../../assets/klg-3.webp'

import studioImage1 from '../../assets/studio-1.jpg'
import studioImage2 from '../../assets/studio-2.jpg'
import studioImage3 from '../../assets/studio-3.jpg'

import wideImage1 from '../../assets/wide-1.jpg'
import wideImage2 from '../../assets/wide-2.jpg'
import wideImage3 from '../../assets/wide-3.jpg'

import highImage1 from '../../assets/high-1.jpg'
import highImage2 from '../../assets/high-2.jpg'
import highImage3 from '../../assets/high-3.jpg'

// Data paket foto
const paketList = ref([
  {
    nama: 'Paket Studio📸',
    deskripsi: 'Pemotretan di studio dengan lighting profesional.',
    fitur: ['30 Foto Digital', 'Edit Warna', 'Durasi 1 Jam'],
    harga: 500000,
    images: [studioImage1, studioImage2, studioImage3]
  },
  {
    nama: 'Paket Keluarga👨‍👩‍👧‍👦',
    deskripsi: 'Pemotretan Keluarga dengan tema bebas.',
    fitur: ['50 Foto Digital', 'Gratis Transport Lokal', 'Durasi 2 Jam'],
    harga: 800000,
    images: [klgImage1, klgImage2, klgImage3]
  },
  {
    nama: 'Paket Prewedding💍',
    deskripsi: 'Paket khusus prewedding dengan properti dan lokasi khusus.',
    fitur: ['100 Foto Digital', 'Makeup & Kostum', 'Durasi 4 Jam'],
    harga: 2500000,
    images: [prewedImage1, prewedImage2, prewedImage3]
  },
  {
    nama: 'Paket New Born👶',
    deskripsi: 'Paket khusus new born untuk usia 0-12 bulan',
    fitur: ['12 foto edit & bonus kolase', 'Kostum dan properti bayi', 'Durasi 60 menit'],
    harga: 1500000,
    images: [bayiImage1, bayiImage2, bayiImage3]
  },
  {
    nama: 'Paket Wide Angle🖼️',
    deskripsi: 'Foto wide angle adalah jenis foto yang diambil menggunakan lensa sudut lebar.',
    fitur: ['2 photo print strip', 'All digital copies', 'Durasi 15 menit', 'max 6 orang'],
    harga: 65000,
    images: [wideImage1, wideImage2, wideImage3]
  },
  {
    nama: 'Paket High Angle📷',
    deskripsi: 'Foto High Angle adalah jenis foto yang mengambil gambar dari sudut di atas objek.',
    fitur: ['8 photo print', 'All digital copies', 'Durasi 25 menit', 'max 6 orang'],
    harga: 250000,
    images: [highImage1, highImage2, highImage3]
  }
])

// Slideshow
const currentSlideIndex = ref({})
const intervals = {}

paketList.value.forEach((paket, i) => {
  currentSlideIndex.value[i] = 0
  if (paket.images.length > 1) {
    intervals[i] = setInterval(() => {
      currentSlideIndex.value[i] = (currentSlideIndex.value[i] + 1) % paket.images.length
    }, 3000)
  }
})

onBeforeUnmount(() => {
  Object.values(intervals).forEach(clearInterval)
})

// Booking
const showBookingModal = ref(false)
const formBooking = ref({
  nama: '',
  tanggal: '',
  jam: '',
  paket: '',
  catatan: ''
})
const formBookingError = ref('')
const bookingList = ref([])
const kalenderTerpakai = ref([])

// Load booking dari localStorage
onMounted(() => {
  const saved = localStorage.getItem('bookingList')
  if (saved) {
    bookingList.value = JSON.parse(saved)
  }
})

// Simpan otomatis jika bookingList berubah
watch(bookingList, (value) => {
  localStorage.setItem('bookingList', JSON.stringify(value))
}, { deep: true })

function openBookingForm(paketNama) {
  formBooking.value = {
    nama: '',
    tanggal: '',
    jam: '',
    paket: paketNama,
    catatan: ''
  }
  formBookingError.value = ''
  showBookingModal.value = true

  const kalenderList = JSON.parse(localStorage.getItem('kalenderBookings') || '[]')
  kalenderTerpakai.value = kalenderList
}

function submitBookingForm() {
  const { nama, tanggal, jam, paket } = formBooking.value
  if (!nama || !tanggal || !jam || !paket) {
    formBookingError.value = 'Semua field wajib diisi ya sayang~💕'
    return
  }

  const kalenderKey = `${tanggal} ${jam}`
  if (kalenderTerpakai.value.includes(kalenderKey)) {
    formBookingError.value = 'Slot waktu ini sudah dibooking orang lain 🕒'
    return
  }

  const newBooking = {
    id: Date.now(),
    status: 'Pending',
    ...formBooking.value
  }

  bookingList.value.push(newBooking)
  kalenderTerpakai.value.push(kalenderKey)
  localStorage.setItem('kalenderBookings', JSON.stringify(kalenderTerpakai.value))

  showBookingModal.value = false
  alert('Booking berhasil disimpan!')
}
</script>

<template>
  <LayoutPage>
    <div class="bg-white rounded-xl shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(paket, index) in paketList"
          :key="index"
          class="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition bg-white flex flex-col"
        >
          <img
            :src="paket.images[currentSlideIndex[index]]"
            class="w-full h-52 object-cover transition-all duration-700 ease-in-out"
          />
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-xl font-semibold text-gray-800 mb-1">{{ paket.nama }}</h4>
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

      <!-- Modal Booking -->
      <div v-if="showBookingModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-xl w-full max-w-md">
          <h3 class="text-xl font-semibold mb-4">Form Booking</h3>
          <div class="space-y-3">
            <input v-model="formBooking.nama" type="text" placeholder="Nama" class="w-full border px-3 py-2 rounded" />
            <input v-model="formBooking.tanggal" type="date" class="w-full border px-3 py-2 rounded" />
            <select v-model="formBooking.jam" class="w-full border px-3 py-2 rounded">
              <option disabled value="">Pilih Jam</option>
              <option
                v-for="jam in ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']"
                :key="jam"
                :disabled="kalenderTerpakai.includes(`${formBooking.tanggal} ${jam}`)"
                :class="kalenderTerpakai.includes(`${formBooking.tanggal} ${jam}`) ? 'text-gray-400 line-through' : ''"
              >
                {{ jam }}
              </option>
            </select>
            <input v-model="formBooking.paket" type="text" disabled class="w-full border px-3 py-2 rounded bg-gray-100" />
            <textarea v-model="formBooking.catatan" placeholder="Catatan" class="w-full border px-3 py-2 rounded"></textarea>
          </div>
          <p v-if="formBookingError" class="text-red-500 text-sm mt-2">{{ formBookingError }}</p>
          <div class="flex justify-end gap-2 mt-4">
            <button @click="showBookingModal = false" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Batal</button>
            <button @click="submitBookingForm" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </LayoutPage>
</template>
