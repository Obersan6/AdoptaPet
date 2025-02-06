
import React from "react";
import { useState, useEffect } from "react";
import { FaPaw } from "react-icons/fa"; 
import { useAuth } from "../context/AuthContext";
import { fetchUserProfile, deleteUserAccount, updateUserProfile } from "../api/api";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import "../styles/Profile.css";

function Profile() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!currentUser || !currentUser.id) {
            setError("User not authenticated. Please log in.");
            navigate("/login");
            return;
        }

        const getUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Authorization error. Please log in again.");
                    return;
                }

                const data = await fetchUserProfile(token, currentUser.id);
                if (data.error) {
                    setError("Failed to load profile.");
                } else {
                    setUser(data);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                }
            } catch (err) {
                setError("An unexpected error occurred.");
            }
        };

        getUserProfile();
    }, [currentUser, navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await updateUserProfile(token, currentUser.id, firstName, lastName);

            if (response.error) {
                throw new Error(response.error);
            }

            setUser(response);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            const response = await deleteUserAccount(token, currentUser.id);

            if (response.error) {
                throw new Error(response.error);
            }

            alert("Account deleted successfully!");
            logout();
            navigate("/signup");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete account.");
        }
    };

    if (error) return <p className="error">{error}</p>;
    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <UserCard />

            <div className="profile-card">
                {/* Paw Icon Above the Title */}
                <div className="paw-container">
                    <FaPaw className="paw-icon" />
                </div>

                <h1 className="profile-title">User Profile</h1>

                {/* Profile Information */}
                <div className="profile-info">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>

                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="profile-form">
                            <label>
                                First Name:
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                            <label>
                                Last Name:
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </label>
                            <div className="profile-buttons">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                            <div className="profile-buttons">
                                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </button>
                                <button className="btn btn-profile btn-danger" onClick={handleDelete}>
                                    Delete Account
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
