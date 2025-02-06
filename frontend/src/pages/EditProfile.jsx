/* Edit profile page */


import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserProfile, updateUserProfile } from "../api/api";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import "../styles/EditProfile.css";

function EditProfile() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        profileImage: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getUserProfile = async () => {
            if (!currentUser || !currentUser.id) return;
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authentication error. Please log in.");
                    setLoading(false);
                    return;
                }

                const data = await fetchUserProfile(token, currentUser.id);
                if (!data.error) {
                    setFormData({
                        firstName: data.first_name || "",
                        lastName: data.last_name || "",
                        profileImage: data.profile_image || ""
                    });
                } else {
                    setError("Failed to load user profile.");
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (currentUser && currentUser.id) {
            getUserProfile();
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await updateUserProfile(token, currentUser.id, formData.firstName, formData.lastName);
            if (response.error) {
                setError(response.error);
            } else {
                navigate("/profile");
            }
        } catch (err) {
            setError("Failed to update profile.");
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <UserCard />
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label htmlFor="lastName">Last Name:</label>
                <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

                           <div className="edit-profile-buttons">
                    <button type="submit" className="btn btn-success">Update</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
