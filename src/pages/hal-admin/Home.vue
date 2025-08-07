<template>
  <LayoutPage>
    <section class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link to="/daftarBooking" class="block">
          <DashboardCard
            title="Booking Hari Ini"
            :value="bookingHariIni"
            :iconSrc="daftarIcon"
            theme="blue"
          />
        </router-link>

        <router-link to="/kalender" class="block">
          <DashboardCard
            title="Jadwal Tersedia"
            :value="jadwalTersedia"
            :iconSrc="kalenderIcon"
            theme="green"
          />
        </router-link>

        <router-link to="/paketfoto" class="block">
          <DashboardCard
            title="Paket Foto"
            :value="jumlahPaket"
            :iconSrc="fotoIcon"
            theme="pink"
          />
        </router-link>

        <router-link to="/daftarBooking" class="block">
          <DashboardCard
            title="Booking Pending"
            :value="bookingPending"
            :iconSrc="pendingIcon"
            theme="yellow"
          />
        </router-link>

        <router-link to="/rekapbooking" class="block">
          <DashboardCard
            title="Rekap Booking"
            :value="rekapBooking"
            :iconSrc="folderIcon"
            theme="purple"
          />
        </router-link>
      </div>
    </section>
  </LayoutPage>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardCard from "../../components/DashboardCard.vue";
import LayoutPage from "../../layouts/layout-admin/LayoutPage.vue";

// ✅ Import gambar
import daftarIcon from "../../assets/checklist.gif";
import kalenderIcon from "../../assets/friendship-day.gif";
import fotoIcon from "../../assets/photo-gallery.gif";
import pendingIcon from "../../assets/overdue.gif";
import folderIcon from "../../assets/files.gif"; // ← typo sebelumnya: assest → assets

// State
const bookingList = ref([]);
const kalenderList = ref([]);
const paketList = ref([]);

onMounted(() => {
  const storedBookings = JSON.parse(localStorage.getItem("bookingList") || "[]");
  const storedKalender = JSON.parse(localStorage.getItem("kalenderBookings") || "[]");
  const storedPaket = JSON.parse(localStorage.getItem("paketList") || "[]");

  bookingList.value = storedBookings;
  kalenderList.value = storedKalender;
  paketList.value = storedPaket;
});

const today = new Date().toISOString().split("T")[0];

const bookingHariIni = computed(
  () => bookingList.value.filter((b) => b.tanggal === today).length
);

const bookingPending = computed(
  () => bookingList.value.filter((b) => b.status === "Pending").length
);

const jadwalTersedia = computed(() => {
  const totalSlotPerHari = 10;
  const totalDipakai = kalenderList.value.length;
  return totalSlotPerHari * 7 - totalDipakai;
});

const jumlahPaket = computed(() => paketList.value.length || 6);

const rekapBooking = computed(() => bookingList.value.length);
</script>
