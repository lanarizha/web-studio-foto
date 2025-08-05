<template>
  <LayoutPage title="Rekap Booking">
    <section class="max-w-6xl mx-auto p-6 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-xl space-y-10">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <!-- Judul -->
        <div class="flex-1">
          <h2 class="text-3xl font-bold text-gray-900">Rekap Booking</h2>
          <p class="text-sm text-gray-600 mt-1">
            Bulan: <strong class="text-blue-600">{{ months[selectedMonth - 1] }} {{ selectedYear }}</strong>
          </p>
        </div>

        <!-- Kalender Mini -->
        <div class="bg-white border rounded-2xl shadow p-4 w-max md:ml-auto">
          <div class="flex items-center justify-between mb-3">
            <button @click="prevMonth" class="p-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-full">‹</button>
            <span class="text-sm font-semibold text-gray-800">{{ months[selectedMonth - 1] }} {{ selectedYear }}</span>
            <button @click="nextMonth" class="p-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-full">›</button>
          </div>
          <div class="grid grid-cols-7 gap-1 text-xs text-center text-gray-600">
            <div v-for="day in days" :key="day" class="font-semibold">{{ day }}</div>
            <div v-for="n in firstDayOffset" :key="'blank-' + n" class="p-1"></div>
            <div
              v-for="date in daysInMonth"
              :key="date"
              class="p-1.5 rounded-lg"
              :class="{
                'bg-blue-100 font-semibold text-blue-600': isBookingDate(date),
                'bg-blue-500 text-white': date === selectedDate,
                'hover:bg-blue-100 cursor-pointer': true
              }"
              @click="selectDate(date)"
            >
              {{ date }}
            </div>
          </div>
        </div>
      </div>

      <!-- Total Booking -->
      <div class="text-gray-800 text-base">
        Total Booking Bulan Ini:
        <span class="font-bold text-blue-700 text-lg">{{ totalBookingBulanIni }}</span>
      </div>

      <!-- Rekap Harian -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-lg font-semibold text-gray-800">Rekap Harian</h3>
          <button
            v-if="selectedDate"
            @click="clearSelectedDate"
            class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
          >
            Tampilkan Semua
          </button>
        </div>
        <div class="overflow-x-auto rounded-xl border bg-white">
          <table class="min-w-full text-sm text-left text-gray-800">
            <thead class="bg-blue-100">
              <tr>
                <th class="px-4 py-3">Tanggal</th>
                <th class="px-4 py-3">Jumlah Booking</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(jumlah, tanggal) in rekapPerHari"
                :key="tanggal"
                class="hover:bg-blue-50 border-t even:bg-gray-50/50"
              >
                <td class="px-4 py-2">{{ tanggal }}</td>
                <td class="px-4 py-2">{{ jumlah }}</td>
              </tr>
              <tr v-if="Object.keys(rekapPerHari).length === 0">
                <td colspan="2" class="px-4 py-4 text-center text-gray-400 italic">
                  Tidak ada booking di bulan ini
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Rekap Paket -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Rekap Paket Foto</h3>
        <div class="overflow-x-auto rounded-xl border bg-white">
          <table class="min-w-full text-sm text-left text-gray-800">
            <thead class="bg-blue-100">
              <tr>
                <th class="px-4 py-3">Paket Foto</th>
                <th class="px-4 py-3">Jumlah Booking</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(jumlah, paket) in rekapPerPaket"
                :key="paket"
                class="hover:bg-blue-50 border-t even:bg-gray-50/50"
              >
                <td class="px-4 py-2">{{ paket }}</td>
                <td class="px-4 py-2">{{ jumlah }}</td>
              </tr>
              <tr v-if="Object.keys(rekapPerPaket).length === 0">
                <td colspan="2" class="px-4 py-4 text-center text-gray-400 italic">
                  Belum ada data paket di bulan ini
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detail Booking -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Detail Booking</h3>
        <div class="overflow-x-auto rounded-xl border bg-white">
          <table class="min-w-full text-sm text-left text-gray-800">
            <thead class="bg-blue-100">
              <tr>
                <th class="px-4 py-3">Nama</th>
                <th class="px-4 py-3">Tanggal</th>
                <th class="px-4 py-3">Jam</th>
                <th class="px-4 py-3">Paket</th>
                <th class="px-4 py-3">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(booking, index) in filteredBookingsDisplay"
                :key="index"
                class="hover:bg-blue-50 border-t even:bg-gray-50/50"
              >
                <td class="px-4 py-2">{{ booking.nama }}</td>
                <td class="px-4 py-2">{{ formatTanggal(booking.tanggal) }}</td>
                <td class="px-4 py-2">{{ booking.jam }}</td>
                <td class="px-4 py-2">{{ booking.paket }}</td>
                <td class="px-4 py-2">{{ booking.catatan || '-' }}</td>
              </tr>
              <tr v-if="filteredBookingsDisplay.length === 0">
                <td colspan="5" class="px-4 py-4 text-center text-gray-400 italic">
                  Tidak ada booking detail di bulan ini
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
import LayoutPage from "../layoutt/LayoutPage.vue";

export default {
  components: { LayoutPage },
  data() {
    const today = new Date();
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
    };
  },
  computed: {
    firstDayOffset() {
      return new Date(this.selectedYear, this.selectedMonth - 1, 1).getDay();
    },
    daysInMonth() {
      return new Date(this.selectedYear, this.selectedMonth, 0).getDate();
    },
    filteredBookings() {
      return this.bookings.filter(b => {
        const d = new Date(b.tanggal);
        return d.getMonth() + 1 === this.selectedMonth && d.getFullYear() === this.selectedYear;
      });
    },
    filteredBookingsDisplay() {
      if (this.selectedDate) {
        return this.filteredBookings.filter(b => {
          const d = new Date(b.tanggal);
          return d.getDate() === this.selectedDate;
        });
      }
      return this.filteredBookings;
    },
    rekapPerHari() {
      const result = {};
      for (const b of this.filteredBookings) {
        const tanggal = this.formatTanggal(b.tanggal);
        result[tanggal] = (result[tanggal] || 0) + 1;
      }
      return result;
    },
    rekapPerPaket() {
      const result = {};
      for (const b of this.filteredBookings) {
        result[b.paket] = (result[b.paket] || 0) + 1;
      }
      return result;
    },
    totalBookingBulanIni() {
      return this.filteredBookings.length;
    },
    isBookingDate() {
      return (date) => {
        const formatted = date.toString().padStart(2, "0") + "-" + this.selectedMonth.toString().padStart(2, "0") + "-" + this.selectedYear;
        return Object.keys(this.rekapPerHari).includes(formatted);
      };
    },
  },
  methods: {
    formatTanggal(tanggal) {
      const date = new Date(tanggal);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    prevMonth() {
      if (this.selectedMonth === 1) {
        this.selectedMonth = 12;
        this.selectedYear -= 1;
      } else {
        this.selectedMonth--;
      }
      this.selectedDate = null;
    },
    nextMonth() {
      if (this.selectedMonth === 12) {
        this.selectedMonth = 1;
        this.selectedYear += 1;
      } else {
        this.selectedMonth++;
      }
      this.selectedDate = null;
    },
    selectDate(date) {
      this.selectedDate = date;
    },
    clearSelectedDate() {
      this.selectedDate = null;
    }
  },
  mounted() {
    const data = localStorage.getItem("bookingList");
    if (data) {
      this.bookings = JSON.parse(data);
    }
  },
};
</script>

<style scoped>
table th,
table td {
  white-space: nowrap;
}
</style>
