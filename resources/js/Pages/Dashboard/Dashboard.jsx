import Dashboard from './main-page';

const AddExpense = () => {
    return (
        <Dashboard>
            <div className="space-y-8">
                <h1 className="text-2xl font-bold">Dashboard Overview</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-500 text-sm">Total Expenses</h2>
                        <p className="mt-1 text-2xl font-bold text-gray-900">₱25,500.00</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-500 text-sm">Monthly Budget</h2>
                        <p className="mt-1 text-2xl font-bold text-gray-900">₱50,000.00</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h2 className="text-gray-500 text-sm">Remaining Budget</h2>
                        <p className="mt-1 text-2xl font-bold text-gray-900">₱24,500.00</p>
                    </div>
                </div>

                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Recent Expenses</h2>
                    <ul className="divide-y divide-gray-200">
                        <li className="py-2 flex justify-between">
                            <span>Groceries</span>
                            <span className="font-medium">₱2,500.00</span>
                        </li>
                        <li className="py-2 flex justify-between">
                            <span>Internet Bill</span>
                            <span className="font-medium">₱1,800.00</span>
                        </li>
                        <li className="py-2 flex justify-between">
                            <span>Transportation</span>
                            <span className="font-medium">₱1,200.00</span>
                        </li>
                    </ul>
                </div>
            </div>
        </Dashboard>
    );
};

export default AddExpense;
