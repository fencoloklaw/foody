<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class FoodNutrientsController extends Controller
{
    private $privateApiUrl;

    public function __construct()
    {
        $this->privateApiUrl = env('PRIVATE_API_URL');
    }

    public function foodNutrients(int $foodId)
    {   
        $response = Http::get("{$this->privateApiUrl}/foods/{$foodId}/food-nutrients");
        if ($response->ok()) {
            return $response->json();
        } else {
            return $response('error', 500);
        }
    }

    // public function show(int $foodId)
    // {
    //     $response = Http::get("{$this->privateApiUrl}/foods/{$foodId}");
    //     if ($response->ok()) {
    //         return $response->json();
    //     } else {
    //         return $response('error', 500);
    //     }
    // }
}
