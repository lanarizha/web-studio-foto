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
              v-for="(booking) in paginatedBookings"
              :key="booking.id"
              class="border-t hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4">{{ booking.nama_customer }}</td>
              <td class="px-6 py-4">{{ booking.tanggal_booking }}</td>
              <td class="px-6 py-4">{{ booking.jam_sesi }}</td>
              <td class="px-6 py-4">{{ booking.jenis_paket }}</td>
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
                  @click="editBooking(booking)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs"
                  @click="deleteBooking(booking.id)"
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
            v-model="newBooking.nama_customer"
            placeholder="Nama"
            class="w-full border px-3 py-2 rounded"
          />
          <input
            v-model="newBooking.tanggal_booking"
            type="date"
            class="w-full border px-3 py-2 rounded"
          />
          <select v-model="newBooking.jam_sesi" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Jam</option>
            <option
              v-for="jam in jamList"
              :key="jam"
            >
              {{ jam }}
            </option>
          </select>
          <select v-model="newBooking.jenis_paket" class="w-full border px-3 py-2 rounded">
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
            v-model="editForm.nama_customer"
            placeholder="Nama"
            class="w-full border px-3 py-2 rounded"
          />
          <input
            v-model="editForm.tanggal_booking"
            type="date"
            class="w-full border px-3 py-2 rounded"
          />
          <select v-model="editForm.jam_sesi" class="w-full border px-3 py-2 rounded">
            <option disabled value="">Pilih Jam</option>
            <option
              v-for="jam in jamList"
              :key="jam"
            >
              {{ jam }}
            </option>
          </select>
          <select v-model="editForm.jenis_paket" class="w-full border px-3 py-2 rounded">
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
import api from "../../services/api";

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
      editBookingId: null,
      bookings: [],
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
        nama_customer: "",
        tanggal_booking: "",
        jam_sesi: "",
        jenis_paket: "",
        status: "",
        catatan: "",
      },
      newBooking: {
        user_id: 1, // Hardcoded user_id
        nama_customer: "",
        tanggal_booking: "",
        jam_sesi: "",
        jenis_paket: "",
        status: "",
        catatan: "",
      },
    };
  },
  computed: {
    filteredBookings() {
      return this.bookings.filter((b) => {
        const namaMatch = b.nama_customer.toLowerCase().includes(this.searchTerm.toLowerCase());
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
    async fetchBookings() {
        try {
            const response = await api.get('/daftar-booking');
            this.bookings = response;
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    },
    nextPage() {
      if (this.endIndex < this.filteredBookings.length) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    async toggleStatus(booking) {
      const newStatus = booking.status === "Pending" ? "Confirmed" : "Pending";
      try {
        await api.put(`/daftar-booking/${booking.id}`, { status: newStatus });
        booking.status = newStatus;
      } catch (error) {
          console.error("Error toggling status:", error);
      }
    },
    editBooking(booking) {
      this.editBookingId = booking.id;
      this.editForm = { ...booking };
      this.showEditModal = true;
    },
    async saveEdit() {
      try {
        await api.put(`/daftar-booking/${this.editBookingId}`, this.editForm);
        this.fetchBookings();
        this.cancelEdit();
      } catch (error) {
        console.error("Error saving edit:", error);
      }
    },
    async deleteBooking(id) {
        if (confirm("Are you sure you want to delete this booking?")) {
            try {
                await api.delete(`/daftar-booking/${id}`);
                this.fetchBookings();
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        }
    },
    async submitBooking() {
      this.formError = "";
      if (!this.newBooking.nama_customer || !this.newBooking.tanggal_booking || !this.newBooking.jam_sesi || !this.newBooking.jenis_paket || !this.newBooking.status) {
        this.formError = "Semua field wajib diisi.";
        return;
      }
      try {
          await api.post('/daftar-booking', this.newBooking);
          this.fetchBookings();
          this.cancelAdd();
      } catch (error) {
          console.error("Error submitting booking:", error);
          this.formError = "Gagal menyimpan booking.";
      }
    },
    cancelAdd() {
      this.resetNewBooking();
      this.showAddModal = false;
    },
    cancelEdit() {
        this.editBookingId = null;
        this.editForm = {
            nama_customer: "",
            tanggal_booking: "",
            jam_sesi: "",
            jenis_paket: "",
            status: "",
            catatan: "",
        };
        this.showEditModal = false;
    },
    resetNewBooking() {
      this.formError = "";
      this.newBooking = {
        user_id: 1, // Hardcoded user_id
        nama_customer: "",
        tanggal_booking: "",
        jam_sesi: "",
        jenis_paket: "",
        status: "",
        catatan: "",
      };
    },
  },
  mounted() {
    this.fetchBookings();
  },
};
</script>

<style scoped>
/* Styling tambahan kalau kamu mau hiasin */
</style>