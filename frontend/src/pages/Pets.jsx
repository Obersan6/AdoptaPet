

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPaw } from "react-icons/fa"; 
import { fetchDogs } from "../api/api";
import UserCard from "../components/UserCard";
import "../styles/Pets.css";  


function Pets() {
    const [dogs, setDogs] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function getDogs() {
            setLoading(true); // Show loading state when fetching new dogs
            try {
                const token = localStorage.getItem("token"); 
                if (!token) throw new Error("User not authenticated");

                const data = await fetchDogs(token, page);  // Ensure page is sent to API
                setDogs(Array.isArray(data.dogs) ? data.dogs : []);
                setTotalPages(data.pagination.totalPages || 1);
            } catch (err) {
                console.error("Error fetching dogs:", err);
                setError("Failed to fetch dogs");
            } finally {
                setLoading(false);
            }
        }
        getDogs();
    }, [page]); // Trigger fetch whenever `page` changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container pets-page">
                <UserCard /> 
           
            {/* Title with Paw Icon */}
            <div className="title-container">
                <h1 className="text-center">Available Dogs</h1>
                <FaPaw className="paw-icon" />
            </div>

            <div className="row">
                {dogs.length > 0 ? (
                    dogs.map((dog) => (
                        <div key={dog.id} className="col-md-4 mb-4 d-flex align-items-stretch">
                            <div className="card pet-card">
                                <img 
                                    src={dog.image || "/default-dog.jpg"} 
                                    alt={dog.name} 
                                    className="card-img-top pet-image"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{dog.name}</h5>
                                    <p className="card-text">
                                        <strong>Breed:</strong> {dog.breed} <br />
                                        <strong>Location:</strong> {dog.location} <br />
                                    </p>
                                    <Link to={`/pets/${dog.id}`} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No dogs available</p>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center my-4">
                <button 
                    className="btn btn-secondary mx-2" 
                    disabled={page === 1} 
                    onClick={() => setPage((prevPage) => prevPage - 1)}
                >
                    Previous
                </button>
                <span className="align-self-center"> Page {page} of {totalPages} </span>
                <button 
                    className="btn btn-secondary mx-2" 
                    disabled={page === totalPages} 
                    onClick={() => setPage((prevPage) => prevPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pets;
