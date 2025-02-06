/* Username card */
import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/UserCard.css"; 

function UserCard() {
    const { currentUser } = useAuth();

    if (!currentUser) return null; // Don't render if no user is logged in

    return (
        <div className="user-info">
            <p><span className="username">{currentUser.username}</span></p>
        </div>
    );
}

export default UserCard;
