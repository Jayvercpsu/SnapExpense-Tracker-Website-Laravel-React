import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import LogoutModal from "@/Components/LogoutModal";
import React, { useState } from "react";
import { menuItems } from "./Sections/side-bar";
import {
    FiMenu,
    FiChevronDown,
    FiChevronRight,
    FiUser,
    FiSettings,
    FiLogOut,
    FiMonitor,
} from "react-icons/fi";

const Dashboard = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleProfileDropdown = () => setProfileDropdown(!profileDropdown);
    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const confirmLogout = () => {
        Inertia.post(route("logout"));
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div
                className={`${
                    sidebarOpen ? "w-64" : "w-20"
                } bg-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col`}
            >
                <div className="p-4 flex items-center justify-between">
                    {sidebarOpen && (
                        <FiMonitor className="h-6 w-6 text-white" />
                    )}
                    {sidebarOpen && (
                        <h1 className="text-xl font-bold">SnapExpenses</h1>
                    )}
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
                            {item.path ? (
                                <Link
                                    href={item.path}
                                    className={`w-full flex items-center p-3 mx-1 rounded-lg transition-colors hover:bg-blue-700 ${
                                        sidebarOpen
                                            ? "justify-start"
                                            : "justify-center"
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {sidebarOpen && (
                                        <span className="ml-3">
                                            {item.text}
                                        </span>
                                    )}
                                </Link>
                            ) : item.action === "logout" ? (
                                <button
                                    onClick={() => setShowLogoutModal(true)}
                                    className={`w-full flex items-center p-3 mx-1 rounded-lg transition-colors hover:bg-blue-700 ${
                                        sidebarOpen
                                            ? "justify-start"
                                            : "justify-center"
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {sidebarOpen && (
                                        <span className="ml-3">
                                            {item.text}
                                        </span>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={() => toggleDropdown(item.id)}
                                    className={`w-full flex items-center p-3 mx-1 rounded-lg transition-colors hover:bg-blue-700 ${
                                        sidebarOpen
                                            ? "justify-between"
                                            : "justify-center"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <span className="text-lg">
                                            {item.icon}
                                        </span>
                                        {sidebarOpen && (
                                            <span className="ml-3">
                                                {item.text}
                                            </span>
                                        )}
                                    </div>
                                    {item.dropdown && sidebarOpen && (
                                        <span>
                                            {activeDropdown === item.id ? (
                                                <FiChevronDown />
                                            ) : (
                                                <FiChevronRight />
                                            )}
                                        </span>
                                    )}
                                </button>
                            )}

                            {item.dropdown &&
                                activeDropdown === item.id &&
                                sidebarOpen && (
                                    <div className="ml-8 mt-1 space-y-1">
                                        {item.dropdown.map((subItem) => (
                                            <Link
                                                key={subItem.path}
                                                href={subItem.path}
                                                className="d-block py-2 px-3 rounded hover:bg-blue-700 text-sm flex items-center"
                                            >
                                                <span className="mr-2">
                                                    {subItem.icon}
                                                </span>
                                                {subItem.text}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="text-xl font-semibold text-gray-800 flex-1">
                        Dashboard
                    </h2>

                    <div className="flex items-center space-x-4">
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
                                    <Link
                                        href="/dashboard/profile"
                                        className="d-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FiUser className="mr-2" /> Profile
                                    </Link>
                                    <button
                                        onClick={() => setShowLogoutModal(true)}
                                        className="w-full text-left d-block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                    >
                                        <FiLogOut className="mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-6">{children}</main>
            </div>
            <LogoutModal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
            />
        </div>
    );
};

export default Dashboard;
