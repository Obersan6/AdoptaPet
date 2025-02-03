
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                setErrors(data.errors || [{msg: data.error}]);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setErrors([{msg: "Server error. Please try again."}]);
        }
    }

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow">
                <h2 className="text-center mb-3">Signup</h2>

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
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="First Name" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Last Name" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>

                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                                 
                    <button type="submit">Signup</button>

                </form>
            </div>
        </div>
    );
}

export default Signup;
