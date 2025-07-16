<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home');
});  

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->name('dashboard');


Route::post('/logout', function () {
    Auth::logout();
    return redirect()->route('login');
})->name('logout');
