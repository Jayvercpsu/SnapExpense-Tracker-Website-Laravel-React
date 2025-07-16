import { useState } from 'react';
import Dashboard from './main-page';
import Modal from '@/Components/Modal'; // Adjust the path if needed
import InputLabel from '@/Components/InputLabel'; // Adjust the path if needed
import { FiUser, FiMail, FiPhone, FiSettings, FiClock, FiDollarSign } from 'react-icons/fi';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Jayver Algadi',
        email: 'jayver@example.com',
        phone: '+63 900 000 0000',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    return (
        <Dashboard>
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
                    <p className="text-gray-500">Manage your account and personal information.</p>
                </div>

                {/* Personal Information Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                            <FiUser className="text-blue-500" />
                            <span className="text-gray-700 font-medium">{formData.name}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FiMail className="text-blue-500" />
                            <span className="text-gray-700">{formData.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FiPhone className="text-blue-500" />
                            <span className="text-gray-700">{formData.phone}</span>
                        </div>
                    </div>
                    <PrimaryButton
                        onClick={() => setShowModal(true)}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Edit Information
                    </PrimaryButton>
                </section>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Edit Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <InputLabel htmlFor="name" value="Name" isFocusedOrFilled={formData.name !== ''} />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="relative">
                            <InputLabel htmlFor="email" value="Email" isFocusedOrFilled={formData.email !== ''} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="relative">
                            <InputLabel htmlFor="phone" value="Phone" isFocusedOrFilled={formData.phone !== ''} />
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="border rounded w-full py-2 px-3 focus:outline-none focus:ring focus:ring-indigo-300"
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <PrimaryButton
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </PrimaryButton>
                            <SecondaryButton
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save Changes
                            </SecondaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </Dashboard>
    );
};

export default Profile;
