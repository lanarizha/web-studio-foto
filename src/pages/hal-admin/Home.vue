<template>
  <LayoutPage>
    <section class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <!-- Booking Hari Ini -->
        <router-link to="/daftarBooking" class="block">
          <DashboardCard
            title="Booking Hari Ini"
            :value="bookingHariIni"
            icon="📷"
            class="text-white bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer"
          />
        </router-link>

        <!-- Jadwal Tersedia -->
        <router-link to="/kalender" class="block">
          <DashboardCard
            title="Jadwal Tersedia"
            :value="jadwalTersedia"
            icon="📅"
            class="text-white bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer"
          />
        </router-link>

        <!-- Paket Aktif -->
        <router-link to="/paketfoto" class="block">
          <DashboardCard
            title="Paket Foto"
            :value="jumlahPaket"
            icon="🖼️"
            class="text-white bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer"
          />
        </router-link>

        <!-- Booking Pending -->
        <router-link to="/daftarBooking" class="block">
          <DashboardCard
            title="Booking Pending"
            :value="bookingPending"
            icon="⏳"
            class="text-white bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer"
          />
        </router-link>

        <!-- Rekap Data Booking -->
        <router-link to="/rekapbooking" class="block">
          <DashboardCard
            title="Rekap Booking"
            :value="rekapBooking"
            icon="🗃️"
            class="text-white bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer"
          />
        </router-link>

      </div>
    </section>
  </LayoutPage>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DashboardCard from '../../components/DashboardCard.vue'
import LayoutPage from '../../layouts/layout-admin/LayoutPage.vue'

// State
const bookingList = ref([])
const kalenderList = ref([])
const paketList = ref([])

// Ambil data dari localStorage
onMounted(() => {
  const storedBookings = JSON.parse(localStorage.getItem('bookingList') || '[]')
  const storedKalender = JSON.parse(localStorage.getItem('kalenderBookings') || '[]')
  const storedPaket = JSON.parse(localStorage.getItem('paketList') || '[]') // kosong kalau belum disimpan

  bookingList.value = storedBookings
  kalenderList.value = storedKalender
  paketList.value = storedPaket
})

// Tanggal hari ini (format YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0]

// Booking Hari Ini
const bookingHariIni = computed(() =>
  bookingList.value.filter(b => b.tanggal === today).length
)

// Booking Pending
const bookingPending = computed(() =>
  bookingList.value.filter(b => b.status === 'Pending').length
)

// Jadwal tersedia = total jam booking per hari (10 slot) - total slot yang dipakai
const jadwalTersedia = computed(() => {
  // total slot penuh = kalenderList
  const totalSlotPerHari = 10
  const totalDipakai = kalenderList.value.length
  return totalSlotPerHari * 7 - totalDipakai // contoh untuk 7 hari ke depan
})

// Jumlah Paket
const jumlahPaket = computed(() => {
  // fallback jika paketList kosong: kita isi default
  return paketList.value.length || 6
})

// Total Booking (rekap)
const rekapBooking = computed(() => bookingList.value.length)
</script>
