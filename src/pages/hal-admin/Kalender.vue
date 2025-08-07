<template>
  <LayoutPage>
    <div
      class="max-w-5xl mx-auto p-6 bg-pastel-blue rounded-3xl shadow-lg border border-blue-100"
    >
      <!-- Header Kalender -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-2">
          <button
            @click="prevMonth"
            class="px-3 py-1 bg-pastel-purple hover:bg-purple-200 rounded-lg shadow-sm transition-all"
          >
            ←
          </button>
          <span class="text-lg font-semibold text-gray-700">
            {{ monthNames[currentMonth] }} {{ currentYear }}
          </span>
          <button
            @click="nextMonth"
            class="px-3 py-1 bg-pastel-purple hover:bg-purple-200 rounded-lg shadow-sm transition-all"
          >
            →
          </button>
        </div>
      </div>

      <!-- Hari -->
      <div
        class="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600 uppercase text-sm"
      >
        <div v-for="day in days" :key="day">{{ day }}</div>
      </div>

      <!-- Tanggal -->
      <div class="grid grid-cols-7 gap-2 mt-2 text-center text-gray-700">
        <div v-for="blank in blanks" :key="'b' + blank"></div>
        <div
          v-for="date in daysInMonth"
          :key="date"
          @click="selectDate(date)"
          class="cursor-pointer rounded-xl py-3 transition-all border relative hover:scale-105 hover:shadow-md"
          :class="[
            isToday(date) ? 'border-blue-100 bg-pastel-yellow font-bold' : '',
            isSelected(date)
              ? 'bg-gradient-to-br from-green-300 to-green-500 text-white font-semibold shadow-md'
              : 'bg-white border-gray-200',
          ]"
        >
          <div>{{ date }}</div>
          <div
            v-if="hasBooking(date)"
            class="w-2 h-2 bg-green-500 rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2"
          ></div>
        </div>
      </div>

      <!-- Slot Waktu -->
      <div v-if="selectedDate" class="mt-8">
        <h3 class="text-xl font-semibold mb-3 text-gray-800">
          🕒 Slot Waktu untuk <span class="text-green-600">{{ formatSelectedDate }}</span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            v-for="hour in timeSlots"
            :key="hour"
            class="p-3 rounded-xl text-sm text-center transition-all flex flex-col items-center justify-center space-y-1 border"
            :class="
              isBooked(hour)
                ? 'bg-gradient-to-br from-green-400 to-green-600 text-white font-semibold border-green-300 shadow'
                : 'bg-pastel-pink text-gray-800 border-pink-200 hover:scale-105 hover:shadow-md'
            "
          >
            <div>{{ hour }}</div>
            <div
              v-if="getBookingDetail(hour)"
              class="text-xs text-white mt-1 font-semibold uppercase text-[10px]"
            >
              Sudah Booking
            </div>
            <div v-else class="text-gray-600 text-xs">Tersedia</div>
          </div>
        </div>
      </div>
    </div>
  </LayoutPage>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import LayoutPage from "../../layouts/layout-admin/LayoutPage.vue";

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const monthNames = [
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
];

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const selectedDate = ref(null);
const bookings = ref([]);
const bookingDetails = ref([]);

const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

const daysInMonth = computed(() => {
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
  return Array.from({ length: lastDay }, (_, i) => i + 1);
});

const blanks = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return Array.from({ length: firstDay });
});

function selectDate(date) {
  selectedDate.value = new Date(currentYear.value, currentMonth.value, date);
}

function formatDateKey(dateObj, time) {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const date = dateObj.getDate().toString().padStart(2, "0");
  time = time.replace(".", ":");
  return `${year}-${month}-${date} ${time}`;
}

function isBooked(time) {
  return bookings.value.includes(formatDateKey(selectedDate.value, time));
}

function isSelected(date) {
  if (!selectedDate.value) return false;
  return (
    selectedDate.value.getDate() === date &&
    selectedDate.value.getMonth() === currentMonth.value &&
    selectedDate.value.getFullYear() === currentYear.value
  );
}

function isToday(date) {
  const now = new Date();
  return (
    now.getDate() === date &&
    now.getMonth() === currentMonth.value &&
    now.getFullYear() === currentYear.value
  );
}

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return "";
  const d = selectedDate.value;
  const dayName = days[d.getDay()];
  const monthName = monthNames[d.getMonth()];
  return `${dayName}, ${d.getDate()} ${monthName} ${d.getFullYear()}`;
});

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDate.value = null;
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDate.value = null;
}

function hasBooking(date) {
  const year = currentYear.value;
  const month = (currentMonth.value + 1).toString().padStart(2, "0");
  date = date.toString().padStart(2, "0");
  const dayKey = `${year}-${month}-${date}`;
  return bookings.value.some((key) => key.startsWith(dayKey));
}

function getBookingDetail(time) {
  if (!selectedDate.value) return null;
  const key = formatDateKey(selectedDate.value, time);
  return bookingDetails.value.find((b) => `${b.tanggal} ${b.jam}` === key);
}

onMounted(() => {
  const saved = localStorage.getItem("kalenderBookings");
  if (saved) bookings.value = JSON.parse(saved);

  const savedDetails = localStorage.getItem("bookingList");
  if (savedDetails) bookingDetails.value = JSON.parse(savedDetails);
});

watch(
  bookings,
  (newVal) => {
    localStorage.setItem("kalenderBookings", JSON.stringify(newVal));
  },
  { deep: true }
);
</script>

<style scoped>
/* Custom pastel colors if not in Tailwind config */
.bg-pastel-blue {
  background-color: #bee3f8;
}
.bg-pastel-purple {
  background-color: #e9d8fd;
}
.bg-pastel-yellow {
  background-color: #fefcbf;
}
.bg-pastel-pink {
  background-color: #fed7e2;
}
</style>
