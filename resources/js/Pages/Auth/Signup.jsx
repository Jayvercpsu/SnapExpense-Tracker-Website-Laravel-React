import { useState } from "react";
import TextInput from "../../Components/TextInput";
import InputLabel from "../../Components/InputLabel";

export default function Signup() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

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
                alert(result.message);
            } else {
                alert(result.message || "Registration failed");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred.");
        }
    };

    return (
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
                            isFocusedOrFilled={isActive || formData.password}
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
    );
}
