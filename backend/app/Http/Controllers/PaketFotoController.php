<?php

namespace App\Http\Controllers;

use App\Models\PaketFoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PaketFotoController extends Controller
{
    public function index()
    {
        $paketFotos = PaketFoto::all()->map(function ($paket) {
            if ($paket->foto) {
                $paket->foto = url(Storage::url($paket->foto));
            }
            return $paket;
        });
        return response()->json($paketFotos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_paket' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'harga' => 'required|integer',
            'fitur' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = $request->except('foto');

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('paket_foto', 'public');
            $data['foto'] = $path;
        }

        $paketFoto = PaketFoto::create($data);

        if ($paketFoto->foto) {
            $paketFoto->foto = url(Storage::url($paketFoto->foto));
        }

        return response()->json($paketFoto, 201);
    }

    // public function show($id)
    // {
    //     $paketFoto = PaketFoto::find($id);

    //     if (is_null($paketFoto)) {
    //         return response()->json(['message' => 'Paket Foto not found'], 404);
    //     }

    //     return response()->json($paketFoto);
    // }

    public function update(Request $request, $id)
    {
        $paketFoto = PaketFoto::find($id);

        if (is_null($paketFoto)) {
            return response()->json(['message' => 'Paket Foto not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama_paket' => 'string|max:255',
            'deskripsi' => 'string',
            'harga' => 'integer',
            'fitur' => 'nullable|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        
        $data = $request->except('foto');

        if ($request->hasFile('foto')) {
            // Delete old photo
            if ($paketFoto->foto) {
                Storage::disk('public')->delete($paketFoto->foto);
            }
            $path = $request->file('foto')->store('paket_foto', 'public');
            $data['foto'] = $path;
        }

        $paketFoto->update($data);

        if ($paketFoto->foto) {
            $paketFoto->foto = url(Storage::url($paketFoto->foto));
        }

        return response()->json($paketFoto);
    }

    public function destroy($id)
    {
        $paketFoto = PaketFoto::find($id);

        if (is_null($paketFoto)) {
            return response()->json(['message' => 'Paket Foto not found'], 404);
        }

        if ($paketFoto->foto) {
            Storage::disk('public')->delete($paketFoto->foto);
        }

        $paketFoto->delete();

        return response()->json(['message' => 'Paket Foto deleted successfully']);
    }
}
