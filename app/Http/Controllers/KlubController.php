<?php

namespace App\Http\Controllers;

use App\Models\Klub;
use App\Models\Skor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class KlubController extends Controller
{
    public function index()
    {
        $data = Klub::all();
        return Inertia::render('Klub', [
            'klubs' => $data,
        ]);
    }

    public function tambahKlub(Request $request)
    {
        $data = Klub::create($request->validate([
            'nama' => ['required', 'string', 'unique:klubs,nama'],
            'kota' => ['required', 'string']
        ], [
            'nama.required' => 'Nama klub harus diisi',
            'nama.unique' => 'Nama klub sudah ada',
            'kota.required' => 'Kota klub harus diisi',
        ]));

        return to_route('home');
    }


    public function skor()
    {
        $klubs = Klub::all();
        $skors = Skor::with(['klubSatu', 'klubDua'])->get();

        return Inertia::render('Skor', [

            'klubs' => $klubs,
            'skors' => $skors,
        ]);
    }

    public function tambahSkor(Request $request)
    {
        $request->validate([
            'klub1.*.id' => ['required'],
            'klub1.*.skor' => ['required'],
            'klub2.*.id' => ['required'],
            'klub2.*.skor' => ['required'],
        ], [
            'klub1.*.id.required' => 'Nama klub harus diisi',
            'klub1.*.skor.required' => 'Skor harus diisi',
            'klub2.*.id.required' => 'Nama klub harus diisi',
            'klub2.*.skor.required' => 'Skor harus diisi',
        ]);


        for ($i = 0; $i < count($request->klub1); $i++) {
            $klub1 = $request->klub1[$i];
            $klub2 = $request->klub2[$i];
            $skor = Skor::where('klub_satu_id', $klub1['id'])->where('klub_dua_id', $klub2['id'])->first();
            $skor2 = Skor::where('klub_satu_id', $klub2['id'])->where('klub_dua_id', $klub1['id'])->first();

            if ($klub1['id'] == $klub2['id']) {
                throw ValidationException::withMessages([
                    'klub1.' . $i . '.id' => 'Klub tidak boleh sama',
                    'klub2.' . $i . '.id' => 'Klub tidak boleh sama',
                ]);
            }
            if ($skor || $skor2) {
                throw ValidationException::withMessages([
                    'klub1.' . $i . '.id' => 'Data pertandingan sudah ada',
                    'klub2.' . $i . '.id' => 'Data pertandingan sudah ada',
                ]);
            }
            $klubSatu = Klub::find($klub1['id']);
            $klubDua = Klub::find($klub2['id']);

            if (!$klubSatu) {
                throw ValidationException::withMessages([
                    'klub1.' . $i . '.id' => 'Data tidak ditemukan',
                ]);
            }
            if (!$klubDua) {
                throw ValidationException::withMessages([
                    'klub2.' . $i . '.id' => 'Data tidak ditemukan',
                ]);
            }

            Skor::create([
                'klub_satu_id' => $klub1['id'],
                'skor_satu' => $klub1['skor'],
                'klub_dua_id' => $klub2['id'],
                'skor_dua' => $klub2['skor'],
            ]);

            if ($klub1['skor'] > $klub2['skor']) {
                $klubSatu->menang += 1;
                $klubDua->kalah += 1;
                $klubSatu->poin += 3;
            }
            if ($klub1['skor'] < $klub2['skor']) {
                $klubDua->menang += 1;
                $klubSatu->kalah += 1;
                $klubDua->poin += 3;
            }
            if ($klub1['skor'] == $klub2['skor']) {
                $klubSatu->poin += 1;
                $klubDua->poin += 1;
                $klubSatu->seri += 1;
                $klubDua->seri += 1;
            }

            $klubSatu->main += 1;
            $klubSatu->goal_menang += $klub1['skor'];
            $klubSatu->goal_kalah += $klub2['skor'];

            $klubDua->main += 1;
            $klubDua->goal_menang += $klub2['skor'];
            $klubDua->goal_kalah += $klub1['skor'];

            $klubSatu->save();
            $klubDua->save();
        }

        return to_route('skor');
    }

    public function klasemen()
    {
        $data = Klub::all();
        return Inertia::render('Klasemen', [
            'data' => $data,
        ]);
    }
}
