<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});
 


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/dashboard', ['page' => 'dashboard']);
})->name('dashboard');

Route::get('/dashboard/add-expense', function () {
    return Inertia::render('Dashboard/add-expense', ['page' => 'add-expense']);
})->name('dashboard.add-expense');

Route::get('/dashboard/dashboard', function () {
    return Inertia::render('Dashboard/dashboard', ['page' => 'dashboard']);
})->name('dashboard.dashboard');

Route::get('/dashboard/import-export', function () {
    return Inertia::render('Dashboard/import-export', ['page' => 'import-export']);
})->name('dashboard.import-export');

Route::get('/dashboard/profile', function () {
    return Inertia::render('Dashboard/profile', ['page' => 'profile']);
})->name('dashboard.profile');

Route::get('/dashboard/add-expense', [ExpenseController::class, 'index'])->name('dashboard.add-expense');
Route::post('/dashboard/add-expense', [ExpenseController::class, 'store'])->name('dashboard.add-expense.store');
Route::put('/dashboard/add-expense/{expense}', [ExpenseController::class, 'update'])->name('dashboard.add-expense.update'); 
Route::delete('/dashboard/add-expense/{id}', [ExpenseController::class, 'destroy'])->name('expense.destroy');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
