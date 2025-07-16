import { useState } from "react";
import TextInput from "../../Components/TextInput";
import InputLabel from "../../Components/InputLabel";
import NotificationModal from "../../Components/NotificationModal";

export default function Signup({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setModalTitle("Registration Success");
                setModalMessage(result.message);
                setModalOpen(true);
                setTimeout(() => {
                    setModalOpen(false);
                    onSwitchToLogin();
                }, 2000); // Switch after 2 seconds
            } else {
                setModalTitle("Registration Failed");
                setModalMessage(result.message || "Registration failed");
                setModalOpen(true);
            }
        } catch (error) {
            console.error(error);
            setModalTitle("Error");
            setModalMessage("An error occurred.");
            setModalOpen(true);
        }
    };

    return (
        <>
            <form className="p-6" onSubmit={handleSubmit}>
                <div className="relative mb-6">
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    >
                        {(isActive) => (
                            <InputLabel
                                htmlFor="name"
                                value="Full Name"
                                isFocusedOrFilled={isActive || formData.name}
                            />
                        )}
                    </TextInput>
                </div>

                <div className="relative mb-6">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    >
                        {(isActive) => (
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                isFocusedOrFilled={isActive || formData.email}
                            />
                        )}
                    </TextInput>
                </div>

                <div className="relative mb-8">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    >
                        {(isActive) => (
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                isFocusedOrFilled={
                                    isActive || formData.password
                                }
                            />
                        )}
                    </TextInput>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                >
                    Create Account
                </button>
            </form>

            <NotificationModal
                show={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
                message={modalMessage}
            />
        </>
    );
}
