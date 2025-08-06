<template>
  <LayoutPage>
    <section class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      <router-link to="/daftarBooking" class="block">
<DashboardCard
  title="Booking Hari Ini"
  :value="bookingHariIni"
  icon="📷"
  theme="blue"
/>
</router-link>

<router-link to="/kalender" class="block">
<DashboardCard
  title="Jadwal Tersedia"
  :value="jadwalTersedia"
  icon="📅"
  theme="green"
/>
</router-link>


<router-link to="/paketfoto" class="block">
<DashboardCard
  title="Paket Foto"
  :value="jumlahPaket"
  icon="🖼️"
  theme="pink"
/>
</router-link>

<router-link to="/daftarBooking" class="block">
<DashboardCard
  title="Booking Pending"
  :value="bookingPending"
  icon="⏳"
  theme="yellow"
/>
</router-link>

<router-link to="/rekapbooking" class="block">
<DashboardCard
  title="Rekap Booking"
  :value="rekapBooking"
  icon="🗃️"
  theme="purple"
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
