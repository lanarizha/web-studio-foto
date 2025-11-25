<?php

namespace App\Http\Controllers;

use App\Models\DaftarBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DaftarBookingController extends Controller
{
    public function index()
    {
        $daftarBookings = DaftarBooking::with(['user', 'paketFoto'])->get();
        return response()->json($daftarBookings);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'paket_id' => 'nullable|exists:paket_fotos',
            'nama_customer' => 'required|string|max:255',
            'tanggal_booking' => 'required|date',
            'jam_sesi' => 'required',
            'jenis_paket' => 'required|string|max:255',
            'status' => 'nullable|string|max:255',
            'catatan' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $existingBooking = DaftarBooking::where('tanggal_booking', $request->tanggal_booking)
                                        ->where('jam_sesi', $request->jam_sesi)
                                        ->first();

        if ($existingBooking) {
            return response()->json(['message' => 'Jadwal sudah di booking.'], 409);
        }

        $daftarBooking = DaftarBooking::create($request->all());

        return response()->json($daftarBooking, 201);
    }

    public function show($id)
    {
        $daftarBooking = DaftarBooking::with(['user', 'paketFoto'])->find($id);

        if (is_null($daftarBooking)) {
            return response()->json(['message' => 'Daftar Booking not found'], 404);
        }

        return response()->json($daftarBooking);
    }

    public function update(Request $request, $id)
    {
        $daftarBooking = DaftarBooking::find($id);

        if (is_null($daftarBooking)) {
            return response()->json(['message' => 'Daftar Booking not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id' => 'exists:users,id',
            // 'paket_id' => 'nullable|exists:paket_fotos,id',
            'nama_customer' => 'string|max:255',
            'tanggal_booking' => 'date',
            'jam_sesi' => '',
            'jenis_paket' => 'string|max:255',
            'status' => 'nullable|string|max:255',
            'catatan' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $existingBooking = DaftarBooking::where('tanggal_booking', $request->tanggal_booking)
                                        ->where('jam_sesi', $request->jam_sesi)
                                        ->where('id', '!=', $id)
                                        ->first();

        if ($existingBooking) {
            return response()->json(['message' => 'Jadwal sudah di booking.'], 409);
        }

        $daftarBooking->update($request->all());

        return response()->json($daftarBooking);
    }

    public function destroy($id)
    {
        $daftarBooking = DaftarBooking::find($id);

        if (is_null($daftarBooking)) {
            return response()->json(['message' => 'Daftar Booking not found'], 404);
        }

        $daftarBooking->delete();

        return response()->json(['message' => 'Daftar Booking deleted successfully']);
    }
}
