<template>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto border border-gray-300 rounded-lg shadow-sm">
      <thead class="bg-gray-100 text-gray-700">
        <tr>
          <th class="px-4 py-2 text-left">Nama</th>
          <th class="px-4 py-2 text-left">Tanggal Booking</th>
          <th class="px-4 py-2 text-left">Jam Sesi</th>
          <th class="px-4 py-2 text-left">Jenis Paket</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Catatan</th>
          <th class="px-4 py-2 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(booking, index) in bookings"
          :key="index"
          class="border-t hover:bg-gray-50"
        >
          <td class="px-4 py-2 whitespace-nowrap">{{ booking.nama }}</td>
          <td class="px-4 py-2 whitespace-nowrap">{{ booking.tanggal }}</td>
          <td class="px-4 py-2 whitespace-nowrap">{{ booking.jam }}</td>
          <td class="px-4 py-2 whitespace-nowrap">{{ booking.paket }}</td>
          <td class="px-4 py-2 whitespace-nowrap">
            <span
              :class="
                booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'
              "
            >
              {{ booking.status }}
            </span>
          </td>
          <td class="px-4 py-2 whitespace-nowrap">{{ booking.catatan }}</td>
          <td class="px-4 py-2 text-center space-x-2">
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
            >
              Hapus
            </button>
            <button
              class="bg-gray-500 text-white px-2 py-1 rounded text-sm hover:bg-gray-600"
            >
              Detail
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "BookingTable",
  data() {
    return {
      bookings: [
        {
          nama: "Lana Rizha",
          tanggal: "2025-07-24",
          jam: "10:00",
          paket: "Paket Studio Premium",
          status: "Confirmed",
          catatan: "Minta background putih",
        },
        {
          nama: "Budi Santoso",
          tanggal: "2025-07-25",
          jam: "14:00",
          paket: "Paket Outdoor",
          status: "Pending",
          catatan: "Lokasi di taman kota",
        },
      ],
    };
  },
};
</script>
