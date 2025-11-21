<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('paket_fotos', function (Blueprint $table) {
            $table->id();
            $table->string('nama_paket', 255);
            $table->string('deskripsi', 500)->nullable();
            $table->integer('harga');
            $table->string('fitur', 500)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('paket_fotos');
    }
};
