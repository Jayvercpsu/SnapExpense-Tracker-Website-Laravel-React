<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
use App\Http\Controllers\ExpenseController;

Route::get('/dashboard/add-expense', [ExpenseController::class, 'index'])->name('dashboard.add-expense');
Route::post('/dashboard/add-expense', [ExpenseController::class, 'store'])->name('dashboard.add-expense.store');
Route::put('/dashboard/add-expense/{expense}', [ExpenseController::class, 'update'])->name('dashboard.add-expense.update');
Route::delete('/dashboard/add-expense/{expense}', [ExpenseController::class, 'destroy'])->name('dashboard.add-expense.destroy');
