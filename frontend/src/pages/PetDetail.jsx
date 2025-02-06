
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPaw } from "react-icons/fa"; 
import { fetchPetById } from "../api/api";
import UserCard from "../components/UserCard";
import "../styles/PetDetail.css";

function PetDetail() {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Manage image navigation

    useEffect(() => {
        async function getDog() {
            try {
                if (!id) throw new Error("No dog ID provided");

                const token = localStorage.getItem("token");
                if (!token) throw new Error("User not authenticated");

                const data = await fetchPetById(id);

                console.log("Pet API Response:", data); // Debugging

                const images = data.images && data.images.length > 0 ? data.images : ["/default-dog.jpg"];
                setDog({ ...data, images });
            } catch (err) {
                console.error("Error fetching pet details:", err);
                setError("Failed to fetch pet details");
            } finally {
                setLoading(false);
            }
        }
        getDog();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!dog) return <p>No dog found.</p>;

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? dog.images.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === dog.images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="container pet-detail">
            <UserCard />

            {/* Title with Paw Icon */}
            <div className="title-container">
                <h1 className="text-center">{dog.name}</h1>
                <FaPaw className="paw-icon" />
            </div>

            {/* Image Carousel */}
            <div className="image-carousel">
                <button className="carousel-btn left" onClick={handlePrevImage}>&#8249;</button>
                <img
                    src={dog.images[currentImageIndex]}
                    alt={`${dog.name} ${currentImageIndex + 1}`}
                    className="pet-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-dog.jpg";
                    }}
                />
                <button className="carousel-btn right" onClick={handleNextImage}>&#8250;</button>
            </div>

            {/* Pet Details */}
            <div className="pet-info">
                <p><strong>Description:</strong> {dog.description || "No description available"}</p>
                <p><strong>Breed:</strong> {dog.breed}</p>
                <p><strong>Age:</strong> {dog.age}</p>
                <p><strong>Gender:</strong> {dog.gender}</p>
                <p><strong>Size:</strong> {dog.size}</p>
                <p><strong>Color:</strong> {dog.color || "Not specified"}</p>
                <p><strong>Traits:</strong> {dog.tags.length > 0 ? dog.tags.join(", ") : "No traits listed"}</p>
                
                {/* Health & Training */}
                <h5>Health & Training</h5>
                <ul>
                    <li>Spayed/Neutered: {dog.attributes.spayed_neutered ? "Yes" : "No"}</li>
                    <li>House Trained: {dog.attributes.house_trained ? "Yes" : "No"}</li>
                    <li>Shots Current: {dog.attributes.shots_current ? "Yes" : "No"}</li>
                    <li>Special Needs: {dog.attributes.special_needs ? "Yes" : "No"}</li>
                </ul>

                {/* Organization */}
                <p><strong>Rescue Organization:</strong> {dog.organization_name}</p>
                <p><strong>Contact:</strong> {dog.organization_email}</p>
                <p><strong>Location:</strong> {dog.location}</p>
            </div>

            {/* Video Display */}
            <div className="video-container">
                {dog.videos && dog.videos.length > 0 ? (
                    dog.videos.map((video, index) => (
                        <div key={index} dangerouslySetInnerHTML={{ __html: video }} className="video-frame my-2" />
                    ))
                ) : (
                    <p className="text-muted">No Videos Available</p>
                )}
            </div>
        </div>
    );
}

export default PetDetail;
