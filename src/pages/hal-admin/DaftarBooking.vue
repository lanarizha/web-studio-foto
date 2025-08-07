<template>
  <LayoutPage title="Daftar Booking">
    <div class="p-6 bg-white rounded-xl shadow-md max-w-6xl mx-auto">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Daftar Booking</h2>

      <!-- Tombol Tambah Booking -->
      <div class="mb-4">
        <button
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
          @click="showAddModal = true"
        >
          + Tambah Booking
        </button>
      </div>

      <!-- Search & Filter -->
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Cari nama..."
          class="w-full md:w-1/3 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring"
        />
        <select
          v-model="selectedStatus"
          class="w-full md:w-1/4 border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Semua Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <!-- Tabel Booking -->
      <div class="overflow-x-auto">
        <table
          class="min-w-full table-auto border border-gray-200 rounded-lg overflow-hidden text-sm"
        >
          <thead class="bg-gray-100 text-gray-700 uppercase text-xs tracking-wide">
            <tr>
              <th class="px-6 py-3 text-left">Nama</th>
              <th class="px-6 py-3 text-left">Tanggal Booking</th>
              <th class="px-6 py-3 text-left">Jam Sesi</th>
              <th class="px-6 py-3 text-left">Jenis Paket</th>
              <th class="px-6 py-3 text-left">Status</th>
              <th class="px-6 py-3 text-left">Catatan</th>
              <th class="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(booking, index) in paginatedBookings"
              :key="index"
              class="border-t hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4">{{ booking.nama }}</td>
              <td class="px-6 py-4">{{ booking.tanggal }}</td>
              <td class="px-6 py-4">{{ booking.jam }}</td>
              <td class="px-6 py-4">{{ booking.paket }}</td>
              <td class="px-6 py-4">
                <button
                  @click="toggleStatus(booking)"
                  class="px-3 py-1 text-xs rounded-full font-semibold focus:outline-none transition"
                  :class="
                    booking.status === 'Confirmed'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  "
                >
                  {{ booking.status }}
                </button>
              </td>
              <td class="px-6 py-4">{{ booking.catatan || "–" }}</td>
              <td class="px-6 py-4 text-center space-x-2">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-xs"
                  @click="editBooking(booking, index)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                  @click="deleteBooking(index)"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <div class="text-sm text-gray-600">
          Menampilkan {{ paginatedBookings.length }} dari
          {{ filteredBookings.length }} data
        </div>
        <div class="space-x-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            @click="nextPage"
            :disabled="endIndex >= filteredBookings.length"
            class="px-3 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL TAMBAH -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <h3 class="text-lg font-bold mb-4">Tambah Booking</h3>

        <div v-if="formError" class="text-sm text-red-600 mb-2">{{ formError }}</div>

        <div class="space-y-3">
          <input
            v-model="newBooking.nama"
            placeholder="Nama"
            class="w-full border px-3 py-2 rounded"
          />
          <input
            v-model="newBooking.tanggal"
            type="date"
            class="w-full border px-3 py-2 rounded"
          />
          <select v-model="newBooking.jam" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Jam</option>
            <option
              v-for="jam in jamList"
              :key="jam"
              :disabled="
                kalenderTerpakai.includes(`${newBooking.tanggal} ${jam}`) &&
                jam !== newBooking.jam
              "
              :class="
                kalenderTerpakai.includes(`${newBooking.tanggal} ${jam}`) &&
                jam !== newBooking.jam
                  ? 'text-gray-400 line-through'
                  : ''
              "
            >
              {{ jam }}
            </option>
          </select>
          <select v-model="newBooking.paket" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Paket</option>
            <option v-for="paket in paketList" :key="paket" :value="paket">
              {{ paket }}
            </option>
          </select>
          <select v-model="newBooking.status" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
          <textarea
            v-model="newBooking.catatan"
            placeholder="Catatan (opsional)"
            class="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="cancelAdd"
            class="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            @click="submitBooking"
            class="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL EDIT -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <h3 class="text-lg font-bold mb-4">Edit Booking</h3>

        <div class="space-y-3">
          <input
            v-model="editForm.nama"
            placeholder="Nama"
            class="w-full border px-3 py-2 rounded"
          />
          <input
            v-model="editForm.tanggal"
            type="date"
            class="w-full border px-3 py-2 rounded"
          />
          <select v-model="editForm.jam" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Jam</option>
            <option
              v-for="jam in jamList"
              :key="jam"
              :disabled="
                kalenderTerpakai.includes(`${editForm.tanggal} ${jam}`) &&
                jam !== editForm.jam
              "
              :class="
                kalenderTerpakai.includes(`${editForm.tanggal} ${jam}`) &&
                jam !== editForm.jam
                  ? 'text-gray-400 line-through'
                  : ''
              "
            >
              {{ jam }}
            </option>
          </select>
          <select v-model="editForm.paket" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Paket</option>
            <option v-for="paket in paketList" :key="paket" :value="paket">
              {{ paket }}
            </option>
          </select>
          <select v-model="editForm.status" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
          </select>
          <textarea
            v-model="editForm.catatan"
            placeholder="Catatan (opsional)"
            class="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="cancelEdit"
            class="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            @click="saveEdit"
            class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </LayoutPage>
</template>

<script>
import LayoutPage from "../../layouts/layout-admin/LayoutPage.vue";

export default {
  name: "BookingTable",
  components: { LayoutPage },
  data() {
    return {
      searchTerm: "",
      selectedStatus: "",
      currentPage: 1,
      pageSize: 5,
      endIndex: 0,
      showAddModal: false,
      showEditModal: false,
      editIndex: null,
      bookings: [],
      kalenderTerpakai: [],
      formError: "",
      jamList: [
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
      ],
      paketList: [
        "Paket Studio📸",
        "Paket Keluarga👨‍👩‍👧‍👦",
        "Paket Prewedding💍",
        "Paket New Born👶",
        "Paket Wide Angle🖼️",
        "Paket High Angle📷",
      ],
      editForm: {
        nama: "",
        tanggal: "",
        jam: "",
        paket: "",
        status: "",
        catatan: "",
      },
      newBooking: {
        nama: "",
        tanggal: "",
        jam: "",
        paket: "",
        status: "",
        catatan: "",
      },
    };
  },
  computed: {
    filteredBookings() {
      return this.bookings.filter((b) => {
        const namaMatch = b.nama.toLowerCase().includes(this.searchTerm.toLowerCase());
        const statusMatch = this.selectedStatus ? b.status === this.selectedStatus : true;
        return namaMatch && statusMatch;
      });
    },
    paginatedBookings() {
      const start = (this.currentPage - 1) * this.pageSize;
      this.endIndex = start + this.pageSize;
      return this.filteredBookings.slice(start, this.endIndex);
    },
  },
  methods: {
    nextPage() {
      if (this.endIndex < this.filteredBookings.length) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    toggleStatus(booking) {
      booking.status = booking.status === "Pending" ? "Confirmed" : "Pending";
      this.saveToLocalStorage();
    },
    editBooking(booking, index) {
      this.editIndex = index;
      this.editForm = { ...booking };
      this.refreshKalenderTerpakai(booking.tanggal);
      this.showEditModal = true;
    },
    saveEdit() {
      const key = `${this.editForm.tanggal} ${this.editForm.jam}`;
      const allKalender = JSON.parse(localStorage.getItem("kalenderBookings") || "[]");
      const oldKey = `${this.bookings[this.editIndex].tanggal} ${
        this.bookings[this.editIndex].jam
      }`;

      if (key !== oldKey && allKalender.includes(key)) {
        alert("Slot waktu ini sudah dipakai orang lain.");
        return;
      }

      if (key !== oldKey) {
        const idx = allKalender.indexOf(oldKey);
        if (idx !== -1) allKalender.splice(idx, 1);
        allKalender.push(key);
        localStorage.setItem("kalenderBookings", JSON.stringify(allKalender));
      }

      this.bookings.splice(this.editIndex, 1, { ...this.editForm });
      this.saveToLocalStorage();
      this.showEditModal = false;
      this.editIndex = null;
    },
    deleteBooking(index) {
      const booking = this.bookings[index];
      const key = `${booking.tanggal} ${booking.jam}`;
      const allKalender = JSON.parse(localStorage.getItem("kalenderBookings") || "[]");
      const idx = allKalender.indexOf(key);
      if (idx !== -1) allKalender.splice(idx, 1);
      localStorage.setItem("kalenderBookings", JSON.stringify(allKalender));

      this.bookings.splice(index, 1);
      this.saveToLocalStorage();
    },
    submitBooking() {
      const { nama, tanggal, jam, paket, status } = this.newBooking;
      const key = `${tanggal} ${jam}`;
      const allKalender = JSON.parse(localStorage.getItem("kalenderBookings") || "[]");

      if (!nama || !tanggal || !jam || !paket || !status) {
        this.formError = "Semua field wajib diisi.";
        return;
      }

      if (allKalender.includes(key)) {
        this.formError = "Slot waktu ini sudah diambil orang lain.";
        return;
      }

      allKalender.push(key);
      localStorage.setItem("kalenderBookings", JSON.stringify(allKalender));

      this.bookings.push({ ...this.newBooking });
      this.saveToLocalStorage();
      this.resetNewBooking();
    },
    cancelAdd() {
      this.resetNewBooking();
      this.showAddModal = false;
    },
    resetNewBooking() {
      this.formError = "";
      this.newBooking = {
        nama: "",
        tanggal: "",
        jam: "",
        paket: "",
        status: "",
        catatan: "",
      };
    },
    refreshKalenderTerpakai(tanggal) {
      const allKalender = JSON.parse(localStorage.getItem("kalenderBookings") || "[]");
      this.kalenderTerpakai = allKalender.filter((item) => item.startsWith(tanggal));
    },
    saveToLocalStorage() {
      localStorage.setItem("bookingList", JSON.stringify(this.bookings));
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem("bookingList");
      if (data) {
        this.bookings = JSON.parse(data);
      }
    },
  },
  watch: {
    "newBooking.tanggal"(val) {
      if (val) this.refreshKalenderTerpakai(val);
    },
    "editForm.tanggal"(val) {
      if (val) this.refreshKalenderTerpakai(val);
    },
  },

  mounted() {
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
/* Styling tambahan kalau kamu mau hiasin */
</style>
