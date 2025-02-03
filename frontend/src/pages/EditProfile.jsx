/* Edit profile page */

import { useState, useEffect } from "react";
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

    useEffect(() => {
        const getUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const data = await fetchUserProfile(token);
            if (!data.error) {
                setFormData({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    profileImage: data.profile_image || ""
                });
            }
        };
        getUserProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        const updatedData = { firstName, lastName };
    
        const response = await updateUserProfile(currentUser.token, currentUser.id, updatedData);
        if (response.error) {
            setError(response.error);
        } else {
            navigate("/profile");
        }
    };
    
    return (
        <div className="edit-profile-container">
            <h1>Edit Profile</h1>
            <UserCard />
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label>Profile Image (URL)</label>
                <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} />

                <div className="edit-profile-buttons">
                    <button type="submit" className="btn btn-success">Update</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/profile")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
