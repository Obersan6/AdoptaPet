import React from "react";
import { useEffect, useState } from "react";
import { fetchPets } from "../api/api";

function PetList() {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getPets = async () => {
            if (!token) {
                setError("Unauthorized: Please log in first.");
                return;
            }
            const data = await fetchPets(token, page, limit);
            if (data.error) {
                setError(data.error);
            } else {
                setPets(data.dogs);
            }
        };
        getPets();
    }, [token, page]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Adoptable Dogs</h1>

            {error ? (
                <p className="alert alert-danger">{error}</p>
            ) : (
                <div className="row">
                    {pets.map((pet) => (
                        <div key={pet.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                {pet.image ? (
                                    <img src={pet.image} className="card-img-top" alt={pet.name} />
                                ) : (
                                    <div className="text-center py-4">
                                        <span className="text-muted">No Image Available</span>
                                    </div>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{pet.name}</h5>
                                    <p className="card-text">
                                        <strong>Breed:</strong> {pet.breed} <br />
                                        <strong>Age:</strong> {pet.age} <br />
                                        <strong>Size:</strong> {pet.size} <br />
                                        <strong>Gender:</strong> {pet.gender} <br />
                                        <strong>Location:</strong> {pet.location}
                                    </p>
                                    <a href={`/pets/${pet.id}`} className="btn btn-primary">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-outline-primary me-2" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    ← Previous
                </button>
                <button className="btn btn-outline-primary" onClick={() => setPage(page + 1)}>
                    Next →
                </button>
            </div>
        </div>
    );
}

export default PetList;
