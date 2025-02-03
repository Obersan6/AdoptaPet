

import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";
import "../styles/Home.css";

function Home() {
    const { currentUser } = useAuth();

    return (
        <div className="home-container">
            
            <UserCard />

            <div className="home-content">
                <FaPaw className="paw-icon" />
                <h1 className="home-title">Find a Very Special Dog</h1>
                <p className="home-subtitle">
                    Discover your perfect companion. Search by breed or location.
                </p>
                <Link to="/search" className="home-button">
                    Find a Dog
                </Link>
            </div>
        </div>
    );
}

export default Home;
