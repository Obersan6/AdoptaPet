
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import { FaPaw } from "react-icons/fa"; 
import { searchDogs } from "../api/api";
import { useAuth } from "../context/AuthContext";
import UserCard from "../components/UserCard";
import "../styles/FindPet.css";

function FindPet() {
    const { token } = useAuth();
    const [searchType, setSearchType] = useState("location");
    const [query, setQuery] = useState("");
    const [dogs, setDogs] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError("Please enter a search term.");
            return;
        }

        if (!token) {
            setError("You must be logged in to search.");
            return;
        }

        if (searchType === "location" && !query.includes(",")) {
            setError("Please enter a location in 'City, State' format.");
            return;
        }

        try {
            setError(null);
            const results = await searchDogs(token, searchType, query);
            if (results.length === 0) {
                setError("No dogs found for your search.");
            }
            setDogs(results);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container find-pet-page">
            <UserCard />
    
            {/* Wrap everything inside this div to push footer down */}
            <div className="find-pet-content">
                <div className="title-container">
                    <FaPaw className="paw-icon" />
                    <h2 className="text-center find-pet-title">Find a Dog</h2>
                </div>
    
                <div className="find-pet-container">
                    <form onSubmit={handleSubmit} className="find-pet-form">
                        <label>Search by:</label>
                        <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="location">Location (City, State)</option>
                            <option value="breed">Breed</option>
                        </select>
    
                        <label>Enter {searchType}:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={`Enter ${searchType}`}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
    
                        <button type="submit" className="find-pet-button">Search</button>
                    </form>
    
                    {error && <p className="text-danger mt-3">{error}</p>}
                </div>
    
                <div className="find-pet-results">
                    {dogs.length > 0 && (
                        <div className="row">
                            {dogs.map((dog) => (
                                <div key={dog.id} className="col-md-4">
                                    <div className="card pet-card">
                                        <img src={dog.image || "/default-dog.jpg"} className="card-img-top pet-image" alt={dog.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{dog.name}</h5>
                                            <p className="card-text">{dog.breed} - {dog.age} - {dog.gender}</p>
                                            <p className="card-text"><strong>Location:</strong> {dog.location}</p>
                                            <Link to={`/pets/${dog.id}`} className="btn btn-primary">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
}

export default FindPet;
