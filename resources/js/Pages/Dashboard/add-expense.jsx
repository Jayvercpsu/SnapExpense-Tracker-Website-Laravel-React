import { useState } from 'react';
import Dashboard from './main-page';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';

const AddExpense = () => {
    const [showModal, setShowModal] = useState(false);
    const [isFocused, setIsFocused] = useState({
        name: false,
        amount: false,
        date: false,
        category: false,
    });

    const handleFocus = (field) => {
        setIsFocused((prev) => ({ ...prev, [field]: true }));
    };

    const handleBlur = (e, field) => {
        setIsFocused((prev) => ({ ...prev, [field]: !!e.target.value }));
    };

    const handleAddExpense = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const amount = formData.get('amount');
        const date = formData.get('date');
        const category = formData.get('category');

        console.log('Expense Data:', { name, amount, date, category });
        setShowModal(false);
        e.target.reset();
        setIsFocused({ name: false, amount: false, date: false, category: false });
    };

    return (
        <Dashboard>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Add Expense</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    + Add Expense
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">No Expenses Yet</h2>
                <p className="text-gray-600">Start by adding a new expense using the button above.</p>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">New Expense</h2>
                    <form onSubmit={handleAddExpense} className="space-y-6">
                        <div className="relative">
                            <InputLabel
                                htmlFor="name"
                                value="Expense Name"
                                isFocusedOrFilled={isFocused.name}
                            />
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onFocus={() => handleFocus('name')}
                                onBlur={(e) => handleBlur(e, 'name')}
                                className="block w-full rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pt-6 pb-2"
                                required
                            />
                        </div>
                        <div className="relative">
                            <InputLabel
                                htmlFor="amount"
                                value="Amount (₱)"
                                isFocusedOrFilled={isFocused.amount}
                            />
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                step="0.01"
                                onFocus={() => handleFocus('amount')}
                                onBlur={(e) => handleBlur(e, 'amount')}
                                className="block w-full rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pt-6 pb-2"
                                required
                            />
                        </div>
                        <div className="relative">
                            <InputLabel
                                htmlFor="date"
                                value="Date"
                                isFocusedOrFilled={isFocused.date}
                            />
                            <input
                                type="date"
                                name="date"
                                id="date"
                                onFocus={() => handleFocus('date')}
                                onBlur={(e) => handleBlur(e, 'date')}
                                className="block w-full rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pt-6 pb-2"
                                required
                            />
                        </div>
                        <div className="relative">
                            <InputLabel
                                htmlFor="category"
                                value="Category"
                                isFocusedOrFilled={isFocused.category}
                            />
                            <select
                                name="category"
                                id="category"
                                onFocus={() => handleFocus('category')}
                                onBlur={(e) => handleBlur(e, 'category')}
                                className="block w-full rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 pt-6 pb-2"
                                required
                            >
                                <option value=""></option>
                                <option value="Expense">Expense</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-2 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                            >
                                Save Expense
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </Dashboard>
    );
};

export default AddExpense;
