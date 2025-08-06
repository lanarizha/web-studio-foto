<template>
  <LayoutPage title="Rekap Booking">
    <section class="max-w-7xl mx-auto p-6">
      <!-- Kalender Aesthetic -->
      <div class="bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 rounded-3xl shadow-2xl p-6 mb-10">
        <div class="flex items-center justify-between mb-6">
          <button @click="prevMonth" class="text-xl hover:text-pink-600">←</button>
          <h2 class="text-3xl font-bold text-purple-700">
            {{ months[selectedMonth - 1] }} {{ selectedYear }}
          </h2>
          <button @click="nextMonth" class="text-xl hover:text-pink-600">→</button>
        </div>

        <!-- Kalender Grid -->
        <div class="grid grid-cols-7 gap-4 text-center text-purple-800 text-sm font-semibold">
          <div v-for="day in days" :key="day" class="uppercase tracking-wide">{{ day }}</div>

          <div v-for="n in firstDayOffset" :key="'blank-' + n" class="h-20"></div>

          <div
            v-for="date in daysInMonth"
            :key="date"
            @click="selectDate(date)"
            class="h-20 p-2 bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer flex flex-col items-center justify-between transition-all"
            :class="{
              'ring-4 ring-pink-400': date === selectedDate,
              'bg-pink-100': isBookingDate(date),
            }"
          >
            <div class="font-bold text-lg text-purple-800">{{ date }}</div>
            <div v-if="isBookingDate(date)" class="text-xs bg-pink-200 text-pink-800 px-2 py-0.5 rounded-full mt-1">
              🎀 Booking
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Booking Tanggal Terpilih -->
      <div v-if="selectedDate" class="mb-10">
        <h3 class="text-xl font-semibold text-purple-700 mb-2">
          📅 Booking Tanggal {{ selectedDate }} {{ months[selectedMonth - 1] }}
        </h3>
        <div class="overflow-x-auto rounded-2xl border bg-white shadow">
          <table class="min-w-full text-sm text-left text-gray-700">
            <thead class="bg-pink-100 text-pink-800">
              <tr>
                <th class="px-4 py-3">Nama</th>
                <th class="px-4 py-3">Jam</th>
                <th class="px-4 py-3">Paket</th>
                <th class="px-4 py-3">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(booking, index) in filteredBookingsByDate"
                :key="index"
                class="hover:bg-pink-50 border-t"
              >
                <td class="px-4 py-2">{{ booking.nama }}</td>
                <td class="px-4 py-2">{{ booking.jam }}</td>
                <td class="px-4 py-2">{{ booking.paket }}</td>
                <td class="px-4 py-2">{{ booking.catatan || '🌸' }}</td>
              </tr>
              <tr v-if="filteredBookingsByDate.length === 0">
                <td colspan="4" class="px-4 py-4 text-center text-gray-400 italic">
                  Tidak ada booking hari ini~ 😌
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Rekap Harian Bulan Ini -->
      <div>
        <h3 class="text-xl font-semibold text-purple-700 mb-2">📊 Rekap Harian Bulan Ini</h3>
        <div class="overflow-x-auto rounded-2xl border bg-white shadow">
          <table class="min-w-full text-sm text-left text-gray-700">
            <thead class="bg-purple-100 text-purple-800">
              <tr>
                <th class="px-4 py-3">Tanggal</th>
                <th class="px-4 py-3">Jumlah Booking</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(jumlah, tanggal) in rekapPerHari"
                :key="tanggal"
                class="hover:bg-purple-50 border-t"
              >
                <td class="px-4 py-2">{{ tanggal }}</td>
                <td class="px-4 py-2">{{ jumlah }}</td>
              </tr>
              <tr v-if="Object.keys(rekapPerHari).length === 0">
                <td colspan="2" class="px-4 py-4 text-center text-gray-400 italic">
                  Masih sepi nih~ 😇
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </LayoutPage>
</template>

<script>
import LayoutPage from '../../layouts/layout-admin/LayoutPage.vue'

export default {
  components: { LayoutPage },
  data() {
    const today = new Date()
    return {
      bookings: [],
      selectedMonth: today.getMonth() + 1,
      selectedYear: today.getFullYear(),
      selectedDate: null,
      months: [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember",
      ],
      days: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    }
  },
  computed: {
    firstDayOffset() {
      return new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay()
    },
    daysInMonth() {
      return new Date(this.selectedYear, this.selectedMonth, 0).getDate()
    },
    filteredBookings() {
      return this.bookings.filter(b => {
        const d = new Date(b.tanggal)
        return d.getMonth() + 1 === this.selectedMonth && d.getFullYear() === this.selectedYear
      })
    },
    filteredBookingsByDate() {
      return this.filteredBookings.filter(b => {
        const d = new Date(b.tanggal)
        return d.getDate() === this.selectedDate
      })
    },
    rekapPerHari() {
      const result = {}
      for (const b of this.filteredBookings) {
        const d = new Date(b.tanggal)
        const tgl = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`
        result[tgl] = (result[tgl] || 0) + 1
      }
      return result
    },
    isBookingDate() {
      return (date) => {
        return this.filteredBookings.some(b => {
          const d = new Date(b.tanggal)
          return d.getDate() === date
        })
      }
    },
  },
  methods: {
    prevMonth() {
      if (this.selectedMonth === 1) {
        this.selectedMonth = 12
        this.selectedYear--
      } else {
        this.selectedMonth--
      }
      this.selectedDate = null
    },
    nextMonth() {
      if (this.selectedMonth === 12) {
        this.selectedMonth = 1
        this.selectedYear++
      } else {
        this.selectedMonth++
      }
      this.selectedDate = null
    },
    selectDate(date) {
      this.selectedDate = date
    }
  },
  mounted() {
    const data = localStorage.getItem("bookingList")
    if (data) {
      this.bookings = JSON.parse(data)
    }
  }
}
</script>
