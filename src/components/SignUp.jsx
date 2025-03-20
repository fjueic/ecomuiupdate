import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import useQueryState from "../hooks/useQueryState";

const Signup = () => {
    const { signup } = useAuth();

    const [email, setEmail] = useQueryState("email", "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
        }
        let result = signup(email, password);
        if (result.status === "failed") {
            setError(result.message)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    Signup
                </h2>
                {error && <h4 className="text-red-500">{error}</h4>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-gray-700">Confirm Password</label>
                        <Input type="password" placeholder="Enter your password again" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <h4 className="text-gray-700 text-sm">Already registered? <Link to="/login" className="text-[#0336A6]">Login</Link></h4>
                    <Button
                        type="submit"
                    >
                        Signup
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

