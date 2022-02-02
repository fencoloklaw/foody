<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class NutrientsController extends Controller
{
    private $privateApiUrl;

    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }

    public function index(Request $request)
    {
        $search = $request->input('search');
        
        $response = Http::get("{$this->privateApiUrl}/nutrients", [
            'search' => $search
         ]);
        if ($response->ok()) {
            return $response->json();
        } else {
            return $response('error', 500);
        }
    }

    public function show(int $nutrientId)
    {
        $response = Http::get("{$this->privateApiUrl}/nutrients/{$nutrientId}");
        if ($response->ok()) {
            return $response->json();
        } else {
            return $response('error', 500);
        }
    }
}
