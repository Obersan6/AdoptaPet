/* Dog model */

require('dotenv').config();
const axios = require('axios');

class Dog {
    // Get an access token from Petfinder API
    static async getAccessToken() {
        const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
            grant_type: "client_credentials",
            client_id: process.env.PETFINDER_API_KEY,
            client_secret: process.env.PETFINDER_API_SECRET
        });
        return response.data.access_token;
    }
    
    static async getFilteredDogs(filters, page = 1, limit = 10, sort = 'name') {
        const token = await this.getAccessToken();
    
        // Ensure valid location format
        let formattedLocation = null;
        if (filters.location) {
            const locationParts = filters.location.split(",").map(part => part.trim());
            if (locationParts.length === 2) {
                formattedLocation = `${locationParts[0]}, ${locationParts[1]}`; // City, State format
            } else {
                console.error("Invalid location format:", filters.location);
                throw new Error("Invalid location format. Use 'City, State'.");
            }
        }
    
        const params = {
            type: "dog",
            breed: filters.breed,
            location: formattedLocation, // Ensure correct format
            status: "adoptable",
            page,
            limit
        };
    
        // Remove empty parameters
        Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
    
        try {
            const response = await axios.get('https://api.petfinder.com/v2/animals', {
                headers: { Authorization: `Bearer ${token}` },
                params
            });
    
            if (!response.data.animals.length) {
                return { dogs: [], totalPages: 0, currentPage: page };
            }
    
            // Extract location properly from `contact.address`
            let sortedDogs = response.data.animals.map((dog) => ({
                id: dog.id,
                name: dog.name ?? "Unknown",
                age: dog.age ?? "Unknown",
                gender: dog.gender ?? "Unknown",
                size: dog.size ?? "Unknown",
                breed: dog.breeds.primary ?? "Unknown",
                color: dog.colors.primary ?? "Unknown",
                coat: dog.coat ?? "Unknown",
                description: dog.description ?? "No description available",
                image: dog.photos.length > 0 ? dog.photos[0].full : null,
                video: dog.videos.length > 0 ? dog.videos[0].embed : null,
                organization_name: dog.contact.organization ?? "Unknown Organization",
                organization_email: dog.contact.email ?? "No email provided",
                // Extract correct city & state
                location: `${dog.contact.address.city ?? "Unknown"}, ${dog.contact.address.state ?? "Unknown"}`
            }));
    
            return {
                dogs: sortedDogs,
                totalPages: response.data.pagination.total_pages,
                currentPage: page
            };
    
        } catch (error) {
            console.error("Error fetching dogs:", error.response?.data || error.message);
            throw new Error("Failed to fetch dogs from Petfinder API.");
        }
    }

 // Fetch a single dog by ID from Petfinder API
static async findById(id) {
    const token = await this.getAccessToken();

    const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const dog = response.data.animal;
    
    return {
        id: dog.id,
        name: dog.name ?? "Unknown",
        age: dog.age ?? "Unknown",
        gender: dog.gender ?? "Unknown",
        size: dog.size ?? "Unknown",
        breed: dog.breeds.primary ?? "Unknown",
        color: dog.colors.primary ?? "Unknown",
        coat: dog.coat ?? "Unknown",
        description: dog.description ?? "No description available",

        // Ensure images exist
        images: dog.photos.length > 0 ? dog.photos.map(photo => photo.full) : [],
        
        // Ensure videos exist
        videos: dog.videos.length > 0 ? dog.videos.map(video => video.embed) : [],

        // Ensure attributes exist (Prevent undefined error)
        attributes: {
            spayed_neutered: dog.attributes?.spayed_neutered ?? false,
            house_trained: dog.attributes?.house_trained ?? false,
            declawed: dog.attributes?.declawed ?? false,
            special_needs: dog.attributes?.special_needs ?? false,
            shots_current: dog.attributes?.shots_current ?? false
        },

        // Ensure tags exist
        tags: dog.tags.length > 0 ? dog.tags : [],

        // Ensure organization details exist
        organization_name: dog.contact.organization ?? "Unknown Organization",
        organization_email: dog.contact.email ?? "No email provided",
        location: `${dog.contact.address.city ?? "Unknown"}, ${dog.contact.address.state ?? "Unknown"}`,
    };
}
}

module.exports = Dog;





