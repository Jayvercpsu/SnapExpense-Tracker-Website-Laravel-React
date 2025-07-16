import React, { useState } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";

const Home = () => {
    const [activeForm, setActiveForm] = useState("login");

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="py-8 text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">
                    SnapExpenses Tracker
                </h1>
                <p className="text-lg text-gray-600">
                    Track your expenses effortlessly
                </p>
            </header>

            <main className="flex-grow flex items-center justify-center px-4">
                <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Take Control of Your Finances
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            SnapExpenses helps you track every penny, set
                            budgets, and achieve your financial goals.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center text-center">
                                <span className="text-3xl mb-3">📊</span>
                                <p className="font-medium">
                                    Visual Spending Analytics
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <span className="text-3xl mb-3">📱</span>
                                <p className="font-medium">
                                    Mobile-Friendly Interface
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <span className="text-3xl mb-3">🔒</span>
                                <p className="font-medium">
                                    Secure Data Protection
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 max-w-md">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="flex">
                                <button
                                    className={`flex-1 py-4 font-bold ${
                                        activeForm === "login"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                    onClick={() => setActiveForm("login")}
                                >
                                    Login
                                </button>
                                <button
                                    className={`flex-1 py-4 font-bold ${
                                        activeForm === "signup"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                    onClick={() => setActiveForm("signup")}
                                >
                                    Sign Up
                                </button>
                            </div>

                            {activeForm === "login" ? <Login /> : <Signup />}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center border-t border-gray-200 mt-12">
                <p className="text-gray-600">
                    © {new Date().getFullYear()} SnapExpenses Tracker. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default Home;
