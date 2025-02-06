
-- Users table: Stores user information for authentication and preferences
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(254) NOT NULL UNIQUE,
    password TEXT NOT NULL,  -- Stores hashed passwords
    profile_image TEXT
);

-- Breeds table: Stores breed names to be referenced in the dogs table
CREATE TABLE breeds (
    id SERIAL PRIMARY KEY,
    breed_name VARCHAR(100) NOT NULL UNIQUE
);

-- Organizations table: Stores shelter/rescue organization details
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    website VARCHAR(255),
    phone VARCHAR(20),  
    email VARCHAR(254) UNIQUE,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postcode VARCHAR(20),  -- To support letters
    country VARCHAR(100) NOT NULL
);

-- Dogs table: Stores individual dog details and links to breed/organization
CREATE TABLE dogs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'adoptable',
    breed_id INT NOT NULL REFERENCES breeds(id) ON DELETE CASCADE,
    age VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(20),
    coat VARCHAR(50),
    description TEXT,
    organization_id INT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    image TEXT,
    video TEXT,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dog attributes table: Stores additional attributes (spayed, house trained, etc.)
CREATE TABLE dog_attributes (
    dog_id INT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
    spayed_neutered BOOLEAN DEFAULT FALSE,
    house_trained BOOLEAN DEFAULT FALSE,
    declawed BOOLEAN DEFAULT FALSE,
    special_needs BOOLEAN DEFAULT FALSE,
    shots_current BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (dog_id)
);

-- Tags table: Stores personality traits and characteristics
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL
);

-- Many-to-Many table: Links dogs and tags (e.g., "Playful", "Friendly")
CREATE TABLE dog_tags (
    dog_id INT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
    tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (dog_id, tag_id)
);


