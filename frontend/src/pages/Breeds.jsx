 

import { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa"; 
import { fetchBreeds } from "../api/api";
import UserCard from "../components/UserCard";
import "../styles/Breeds.css"; 

function Breeds() {
    const [breeds, setBreeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function getBreeds() {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("User not authenticated");

                const data = await fetchBreeds(token, 10, page); // Call correct API function
                setBreeds(Array.isArray(data.breeds) ? data.breeds : []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error("Error fetching breeds:", err);
                setError("Failed to fetch breeds");
            } finally {
                setLoading(false);
            }
        }
        getBreeds();
    }, [page]); // Re-fetch breeds when `page` changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container breeds-page">
            <UserCard />

            {/* Title with Paw Icon */}
            <div className="title-container">
                <h1 className="text-center">Dog Breeds</h1>
                <FaPaw className="paw-icon" />
            </div>

            <ul className="breed-list">
                {breeds.length > 0 ? (
                    breeds.map((breed, index) => (
                        <li key={index} className="breed-card">
                            {breed.breed_name}
                        </li>
                    ))
                ) : (
                    <p className="text-center">No breeds available</p>
                )}
            </ul>
        </div>
    );
}

export default Breeds;
