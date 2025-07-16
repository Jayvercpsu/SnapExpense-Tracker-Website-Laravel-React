import React, { useState } from 'react';
import { 
  FiHome, FiPieChart, FiDollarSign, FiSettings, FiUser, 
  FiLogOut, FiPlus, FiEdit2, FiTrash2, FiMenu, 
  FiChevronDown, FiChevronRight, FiCreditCard, FiTag, 
  FiBarChart2, FiCalendar, FiDownload
} from 'react-icons/fi';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'Groceries', amount: 85.20, date: '2023-05-15', category: 'Food' },
    { id: 2, name: 'Internet Bill', amount: 59.99, date: '2023-05-10', category: 'Utilities' },
    { id: 3, name: 'Gas', amount: 45.50, date: '2023-05-05', category: 'Transportation' },
  ]);
  const [currentExpense, setCurrentExpense] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleProfileDropdown = () => setProfileDropdown(!profileDropdown);
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newExpense = {
      id: expenses.length + 1,
      name: formData.get('name'),
      amount: parseFloat(formData.get('amount')),
      date: formData.get('date'),
      category: formData.get('category')
    };
    setExpenses([...expenses, newExpense]);
    setAddModalOpen(false);
  };

  const handleEditExpense = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedExpense = {
      id: currentExpense.id,
      name: formData.get('name'),
      amount: parseFloat(formData.get('amount')),
      date: formData.get('date'),
      category: formData.get('category')
    };
    setExpenses(expenses.map(exp => exp.id === currentExpense.id ? updatedExpense : exp));
    setEditModalOpen(false);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Sidebar menu items with dropdowns
  const menuItems = [
    {
      id: 'dashboard',
      icon: <FiHome />,
      text: 'Dashboard',
      active: true,
      dropdown: [
        { icon: <FiBarChart2 />, text: 'Overview' },
        { icon: <FiCalendar />, text: 'Calendar' }
      ]
    },
    {
      id: 'expenses',
      icon: <FiDollarSign />,
      text: 'Expenses',
      dropdown: [
        { icon: <FiCreditCard />, text: 'All Expenses' },
        { icon: <FiTag />, text: 'Categories' },
        { icon: <FiDownload />, text: 'Import/Export' }
      ]
    },
    {
      id: 'analytics',
      icon: <FiPieChart />,
      text: 'Analytics',
      dropdown: [
        { icon: <FiBarChart2 />, text: 'Reports' },
        { icon: <FiPieChart />, text: 'Visualizations' }
      ]
    },
    {
      id: 'settings',
      icon: <FiSettings />,
      text: 'Settings',
      dropdown: [
        { icon: <FiUser />, text: 'Profile' },
        { icon: <FiSettings />, text: 'Preferences' }
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Enhanced Sidebar with Dropdowns */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">SnapExpenses</h1>}
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <FiMenu size={20} />
          </button>
        </div>
        
        <nav className="mt-4 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => item.dropdown ? toggleDropdown(item.id) : null}
                className={`w-full flex items-center p-3 mx-1 rounded-lg transition-colors 
                  ${item.active ? 'bg-blue-700' : 'hover:bg-blue-700'}
                  ${item.dropdown ? 'justify-between' : ''}`}
              >
                <div className="flex items-center">
                  <span className="text-lg">{item.icon}</span>
                  {sidebarOpen && <span className="ml-3">{item.text}</span>}
                </div>
                {item.dropdown && sidebarOpen && (
                  <span>
                    {activeDropdown === item.id ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                )}
              </button>
              
              {item.dropdown && activeDropdown === item.id && sidebarOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.dropdown.map((subItem, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block py-2 px-3 rounded hover:bg-blue-700 text-sm flex items-center"
                    >
                      <span className="mr-2">{subItem.icon}</span>
                      {subItem.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

       
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
         
          
          <h2 className="text-xl font-semibold text-gray-800 flex-1">Your Expenses</h2>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setAddModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition focus:outline-none"
            >
              <FiPlus /> <span className="hidden sm:inline">Add Expense</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User profile"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                  <FiUser />
                </div>
              </button>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiUser className="mr-2" /> Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiSettings className="mr-2" /> Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiLogOut className="mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 md:p-6">
          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <StatCard title="Total Spent" value="$190.69" change="+2.4%" changeType="increase" />
            <StatCard title="Monthly Budget" value="$500.00" change="38% used" changeType="neutral" />
            <StatCard title="Largest Expense" value="$85.20" change="Groceries" changeType="decrease" />
          </div>

          {/* Expenses Table - Responsive */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">${expense.amount.toFixed(2)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{expense.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${expense.category === 'Food' ? 'bg-green-100 text-green-800' : 
                            expense.category === 'Utilities' ? 'bg-blue-100 text-blue-800' : 
                            'bg-purple-100 text-purple-800'}`}>
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              setCurrentExpense(expense);
                              setEditModalOpen(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                            aria-label="Edit expense"
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            onClick={() => deleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-900"
                            aria-label="Delete expense"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add Expense Modal */}
      {addModalOpen && (
        <Modal onClose={() => setAddModalOpen(false)} title="Add New Expense">
          <form onSubmit={handleAddExpense}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Expense Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Groceries"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="date"
                name="date"
                type="date"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="category"
                name="category"
                required
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Expense
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Expense Modal */}
      {editModalOpen && currentExpense && (
        <Modal onClose={() => setEditModalOpen(false)} title="Edit Expense">
          <form onSubmit={handleEditExpense}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Expense Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="name"
                name="name"
                type="text"
                defaultValue={currentExpense.name}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={currentExpense.amount}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="date"
                name="date"
                type="date"
                defaultValue={currentExpense.date}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="category"
                name="category"
                defaultValue={currentExpense.category}
                required
              >
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

// Enhanced StatCard Component
const StatCard = ({ title, value, change, changeType }) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
    <h3 className="text-gray-500 text-sm font-medium truncate">{title}</h3>
    <p className="mt-1 text-xl md:text-2xl font-semibold text-gray-900 truncate">{value}</p>
    <p className={`mt-2 text-xs md:text-sm ${changeType === 'increase' ? 'text-green-600' : changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'}`}>
      {change}
    </p>
  </div>
);

// Enhanced Modal Component
const Modal = ({ onClose, title, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

export default Dashboard;