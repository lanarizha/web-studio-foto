<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DaftarBooking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        // 'paket_id',
        'nama_customer',
        'tanggal_booking',
        'jam_sesi',
        'jenis_paket',
        'status',
        'catatan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function paketFoto()
    {
        return $this->belongsTo(PaketFoto::class, 'paket_foto');
    }
}
