<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index()
    {
        $expenses = Expense::latest()->get();
        return Inertia::render('Dashboard/add-expense', ['expenses' => $expenses]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'category' => 'required|string|max:255',
        ]);

        Expense::create($request->all());

        return redirect()->back()->with('success', 'Expense added successfully.');
    }

    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'date' => 'required|date',
            'category' => 'required|string|max:255',
        ]);

        $expense->update($request->all());

        return redirect()->back()->with('success', 'Expense updated successfully.');
    }

   public function destroy($id)
{
    $expense = Expense::findOrFail($id);
    $expense->delete();

    return redirect()->back()->with('success', 'Expense deleted successfully.');
}

}
