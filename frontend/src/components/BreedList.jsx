/* BreedList component: Fetches and displays the breeds from your backend. */

import React from "react";
import { useEffect, useState } from "react";
import { fetchBreeds } from "../api/api";



function BreedList({ page, setPage }) {
    const [breeds, setBreeds] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
       
        const getBreeds = async () => {
            if (!token) {
                setError("Unauthorized: Please log in first.");
                return;
            }
    
            const data = await fetchBreeds(token, 10, page);
            
            if (data.error) {
                setError(data.error);  // Set error if it exists
            } else if (data && Array.isArray(data.breeds)) {
                setBreeds(data.breeds);  // Safely handle breeds if the structure is correct
            } else {
                setError("Unexpected response format.");
            }
        };
        getBreeds();
    }, [token, page]);

    return (
        <div className="container py-4">
            <h1 className="text-center mb-4">Dog Breeds</h1>

            {error ? (
                <p className="alert alert-danger">{error}</p>
            ) : (
                <div className="row justify-content-center">
                    {breeds.map((breed, index) => (
                        <div key={index} className="col-md-3 mb-3">
                            <div className="card text-center p-3 shadow-sm">
                                <h5 className="text-primary">{breed.breed_name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Buttons */}
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    ← Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => setPage((prev) => prev + 1)}
                >
                    Next →
                </button>
            </div>
        </div>
    );
}

export default BreedList;
