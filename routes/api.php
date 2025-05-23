<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;

Route::middleware(['api', 'cors'])->group(function () {
    Route::apiResource('properties', PropertyController::class);
});
