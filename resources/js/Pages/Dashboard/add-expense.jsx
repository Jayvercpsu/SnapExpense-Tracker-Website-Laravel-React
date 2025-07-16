import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Dashboard from "./main-page";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import DeleteModal from "@/Components/DeleteModal";

const AddExpense = ({ expenses }) => {
    const [showModal, setShowModal] = useState(false);
    const [editExpense, setEditExpense] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
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

        const payload = {
            name: formData.get("name"),
            amount: formData.get("amount"),
            date: formData.get("date"),
            category: formData.get("category"),
        };

        if (editExpense) {
            router.put(`/dashboard/add-expense/${editExpense.id}`, payload);
        } else {
            router.post("/dashboard/add-expense", payload);
        }

        setShowModal(false);
        setEditExpense(null);
        setIsFocused({
            name: false,
            amount: false,
            date: false,
            category: false,
        });
    };

    const handleEdit = (expense) => {
        setEditExpense(expense);
        setShowModal(true);
        setIsFocused({
            name: true,
            amount: true,
            date: true,
            category: true,
        });
    };

    const handleDeleteRequest = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        router.delete(`/dashboard/add-expense/${selectedId}`);
        setShowDeleteModal(false);
        setSelectedId(null);
    };

    return (
        <Dashboard>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Add Expense</h1>
                <button
                    onClick={() => {
                        setEditExpense(null);
                        setShowModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    + Add Expense
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Your Expenses</h2>

                {expenses.length === 0 ? (
                    <p className="text-gray-600">No expenses found.</p>
                ) : (
                    <table className="w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Amount (₱)</th>
                                <th className="p-2 border">Date</th>
                                <th className="p-2 border">Category</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.id} className="text-center">
                                    <td className="p-2 border">
                                        {expense.name}
                                    </td>
                                    <td className="p-2 border">
                                        ₱ {Number(expense.amount).toFixed(2)}
                                    </td>
                                    <td className="p-2 border">
                                        {expense.date}
                                    </td>
                                    <td className="p-2 border">
                                        {expense.category}
                                    </td>
                                    <td className="p-2 border space-x-2">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteRequest(expense.id)
                                            }
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                    setEditExpense(null);
                }}
            >
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editExpense ? "Edit Expense" : "New Expense"}
                    </h2>
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
                                defaultValue={editExpense?.name}
                                onFocus={() => handleFocus("name")}
                                onBlur={(e) => handleBlur(e, "name")}
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
                                defaultValue={editExpense?.amount}
                                step="0.01"
                                onFocus={() => handleFocus("amount")}
                                onBlur={(e) => handleBlur(e, "amount")}
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
                                defaultValue={editExpense?.date}
                                onFocus={() => handleFocus("date")}
                                onBlur={(e) => handleBlur(e, "date")}
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
                                defaultValue={editExpense?.category || ""}
                                onFocus={() => handleFocus("category")}
                                onBlur={(e) => handleBlur(e, "category")}
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
                                onClick={() => {
                                    setShowModal(false);
                                    setEditExpense(null);
                                }}
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

            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </Dashboard>
    );
};

export default AddExpense;
