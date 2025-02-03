
import { Link } from "react-router-dom";
import "../styles/Pets.css";

function PetCard({ pet }) {
    return (
        <div className="pet-card card">
            <img
                src={pet.image || "/default-dog.jpg"} // Default image if none
                alt={pet.name}
                className="pet-image card-img-top"
            />
            <div className="card-body pet-details">
                <h5 className="card-title pet-name">{pet.name}</h5>
                <p className="card-text pet-breed">{pet.breed}</p>
                <Link to={`/pets/${pet.id}`} className="btn btn-primary">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default PetCard;




