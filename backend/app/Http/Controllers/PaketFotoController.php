<?php

namespace App\Http\Controllers;

use App\Models\PaketFoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaketFotoController extends Controller
{
    public function index()
    {
        $paketFotos = PaketFoto::all();
        return response()->json($paketFotos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_paket' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'harga' => 'required|integer',
            'fitur' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $paketFoto = PaketFoto::create($request->all());

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
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $paketFoto->update($request->all());

        return response()->json($paketFoto);
    }

    public function destroy($id)
    {
        $paketFoto = PaketFoto::find($id);

        if (is_null($paketFoto)) {
            return response()->json(['message' => 'Paket Foto not found'], 404);
        }

        $paketFoto->delete();

        return response()->json(['message' => 'Paket Foto deleted successfully']);
    }
}
