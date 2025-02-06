/* Signup page */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import "../styles/Signup.css"; 

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState([]);

    async function handleSignup(e) {
        e.preventDefault();
        setErrors([]);

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
                navigate("/");
            } else {
                setErrors(data.errors || [{ msg: data.error }]);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setErrors([{ msg: "Server error. Please try again." }]);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-card">
                <FaPaw className="paw-icon" />
                <h2 className="signup-title">Signup</h2>

                {errors.length > 0 && (
                    <div className="alert alert-danger">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error.msg}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                    </div>

                    <div className="input-group">
                        <input type="text" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    </div>

                    <div className="input-group">
                        <input type="text" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    </div>

                    <div className="input-group">
                        <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>

                    <div className="input-group">
                        <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>

                    <button type="submit" className="signup-button">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;  