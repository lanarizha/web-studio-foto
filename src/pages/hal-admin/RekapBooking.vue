<template>
  <LayoutPage title="Rekap Booking">
    <section class="max-w-7xl mx-auto p-4 sm:p-6">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-6 mb-6 sm:mb-8"
      >
        <div>
          <p class="text-sm text-gray-500 mt-1">
            Bulan:
            <span class="text-purple-600 font-semibold">
              {{ months[selectedMonth - 1] }} {{ selectedYear }}
            </span>
          </p>
        </div>

        <!-- Navigasi Kalender -->
        <div
          class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto"
        >
          <button
            @click="prevMonth"
            class="bg-pink-200 hover:bg-pink-300 text-pink-700 rounded-lg px-4 py-2 w-full sm:w-auto"
          >
            ‹ Bulan Sebelumnya
          </button>
          <button
            @click="nextMonth"
            class="bg-purple-200 hover:bg-purple-300 text-purple-700 rounded-lg px-4 py-2 w-full sm:w-auto"
          >
            Bulan Selanjutnya ›
          </button>
        </div>
      </div>

      <!-- Kalender -->
      <div
        class="bg-white rounded-3xl shadow-xl border border-pink-100 p-4 sm:p-6 mb-10 overflow-x-auto"
      >
        <div
          class="grid grid-cols-7 gap-2 sm:gap-4 text-center text-sm sm:text-lg font-semibold text-purple-500 mb-4"
        >
          <div v-for="day in days" :key="day" class="uppercase">{{ day }}</div>
        </div>
        <div class="grid grid-cols-7 gap-2 sm:gap-4 text-center">
          <div v-for="n in firstDayOffset" :key="'blank-' + n" class="h-16 sm:h-20"></div>
          <div
            v-for="date in daysInMonth"
            :key="date"
            class="h-16 sm:h-20 flex items-center justify-center rounded-2xl transition-all duration-200 cursor-pointer text-sm sm:text-lg font-semibold"
            :class="{
              'bg-pink-400 text-white': date === selectedDate,
              'bg-purple-100 text-purple-700': isBookingDate(date),
              'hover:bg-pink-100 hover:scale-105': true,
            }"
            @click="selectDate(date)"
          >
            {{ date }}
          </div>
        </div>
      </div>

      <!-- Detail Rekap -->
      <div class="grid md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Total Booking -->
        <div class="bg-pink-100 p-4 sm:p-6 rounded-2xl shadow-sm border border-pink-200">
          <h3 class="text-lg sm:text-xl font-semibold text-pink-700 mb-2">
            Total Booking Bulan Ini
          </h3>
          <p class="text-3xl sm:text-4xl font-bold text-pink-600">
            {{ totalBookingBulanIni }}
          </p>
        </div>

        <!-- Rekap Per Hari -->
        <div
          class="bg-purple-100 p-4 sm:p-6 rounded-2xl shadow-sm border border-purple-200"
        >
          <h3 class="text-lg sm:text-xl font-semibold text-purple-700 mb-2">
            📅 Rekap Harian
          </h3>
          <div class="overflow-x-auto">
            <table
              class="w-full min-w-[400px] text-left text-sm sm:text-base text-gray-700"
            >
              <thead class="bg-purple-200 text-purple-700">
                <tr>
                  <th class="px-4 py-2">Tanggal</th>
                  <th class="px-4 py-2">Jumlah Booking</th>
                  <th class="px-4 py-2">Jenis Paket</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(data, tanggal) in rekapPerHari"
                  :key="tanggal"
                  class="even:bg-purple-50 border-t"
                >
                  <td class="px-4 py-2">{{ tanggal }}</td>
                  <td class="px-4 py-2">{{ data.jumlah }}</td>
                  <td class="px-4 py-2">
                    <ul class="list-disc list-inside space-y-1">
                      <li v-for="(paket, index) in data.paket" :key="index">
                        {{ paket }}
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr v-if="Object.keys(rekapPerHari).length === 0">
                  <td colspan="3" class="px-4 py-4 text-center text-gray-400 italic">
                    Belum ada booking
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Rekap Per Paket -->
        <div
          class="md:col-span-2 bg-blue-100 p-4 sm:p-6 rounded-2xl shadow-sm border border-blue-200"
        >
          <h3 class="text-lg sm:text-xl font-semibold text-blue-700 mb-2">
            🎁 Rekap Paket Foto
          </h3>
          <div class="overflow-x-auto">
            <table
              class="w-full min-w-[400px] text-left text-sm sm:text-base text-gray-700"
            >
              <thead class="bg-blue-200 text-blue-700">
                <tr>
                  <th class="px-4 py-2">Paket</th>
                  <th class="px-4 py-2">Jumlah Booking</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(jumlah, paket) in rekapPerPaket"
                  :key="paket"
                  class="even:bg-blue-50 border-t"
                >
                  <td class="px-4 py-2">{{ paket }}</td>
                  <td class="px-4 py-2">{{ jumlah }}</td>
                </tr>
                <tr v-if="Object.keys(rekapPerPaket).length === 0">
                  <td colspan="2" class="px-4 py-4 text-center text-gray-400 italic">
                    Belum ada data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </LayoutPage>
</template>

<script>
import LayoutPage from "../../layouts/layout-admin/LayoutPage.vue";

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
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
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
      return this.bookings.filter((b) => {
        const d = new Date(b.tanggal);
        return (
          d.getMonth() + 1 === this.selectedMonth && d.getFullYear() === this.selectedYear
        );
      });
    },
    rekapPerHari() {
      const result = {};
      for (const b of this.filteredBookings) {
        const tgl = this.formatTanggal(b.tanggal);
        if (!result[tgl]) {
          result[tgl] = { jumlah: 0, paket: [] };
        }
        result[tgl].jumlah++;
        result[tgl].paket.push(b.paket);
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
        const dateStr =
          date.toString().padStart(2, "0") +
          "-" +
          this.selectedMonth.toString().padStart(2, "0") +
          "-" +
          this.selectedYear;
        return Object.prototype.hasOwnProperty.call(this.rekapPerHari, dateStr);
      };
    },
  },
  methods: {
    formatTanggal(tanggal) {
      const d = new Date(tanggal);
      return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${d.getFullYear()}`;
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
section {
  font-family: "Nunito", "Segoe UI", sans-serif;
}
</style>
