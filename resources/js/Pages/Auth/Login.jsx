import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import TextInput from "../../Components/TextInput";
import InputLabel from "../../Components/InputLabel";
import NotificationModal from "../../Components/NotificationModal";
import InputError from "../../Components/InputError";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
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
        setErrors({ email: "", password: "" }); // Reset previous errors

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setModalTitle("Login Success");
                setModalMessage(result.message);
                setModalOpen(true);

                setTimeout(() => {
                    Inertia.visit("/dashboard");
                }, 1000);
            } else {
                setModalTitle("Login Failed");
                setModalMessage(result.message || "Login failed");
                setModalOpen(true);

                // Sample handling for expected error response structure
                setErrors({
                    email: result.errors?.email || "",
                    password: result.errors?.password || "",
                });

                // If only generic error is returned
                if (!result.errors) {
                    setErrors({
                        email: "Invalid credentials",
                        password: "Invalid credentials",
                    });
                }
            }
        } catch (error) {
            console.error(error);
            setModalTitle("Error");
            setModalMessage("An unexpected error occurred.");
            setModalOpen(true);
        }
    };

    return (
        <>
            <form className="p-6" onSubmit={handleSubmit}>
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
                    <InputError message={errors.email} className="mt-2" />
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
                                isFocusedOrFilled={isActive || formData.password}
                            />
                        )}
                    </TextInput>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                >
                    Login
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
