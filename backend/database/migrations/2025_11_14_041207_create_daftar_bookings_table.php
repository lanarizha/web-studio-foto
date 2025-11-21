<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daftar_bookings', function (Blueprint $table) {
            $table->id();

            // Relasi ke users
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // Relasi ke paket_fotos (opsional, karena ERD pakai varchar)
            // Jika tidak ingin relasi, hapus baris ini dan ubah ke string
        
            // $table->foreignId('paket_id')->nullable()->constrained('paket_fotos')->nullOnDelete();

            $table->string('nama_customer', 255);
            $table->date('tanggal_booking');
            $table->time('jam_sesi');
            $table->string('jenis_paket', 255); // sesuai ERD
            $table->string('status', 255)->nullable();
            $table->string('catatan', 500)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daftar_bookings');

    }
};
