
-- Clear all existing data before inserting new test data
DELETE FROM dog_tags;
DELETE FROM user_favorites;
DELETE FROM dog_attributes;
DELETE FROM dogs;
DELETE FROM breeds;
DELETE FROM organizations;
DELETE FROM users;

-- Reset auto-increment sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE breeds_id_seq RESTART WITH 1;
ALTER SEQUENCE organizations_id_seq RESTART WITH 1;
ALTER SEQUENCE dogs_id_seq RESTART WITH 1;

-- Insert test users
INSERT INTO users (username, first_name, last_name, email, password, profile_image)
VALUES 
('testuser', 'Test', 'User', 'test@example.com', 'hashedpassword', NULL);

-- Insert test breeds (Fixing column name to `breed_name`)
INSERT INTO breeds (id, breed_name)
VALUES 
(1, 'Labrador Retriever'),
(2, 'German Shepherd'),
(3, 'Golden Retriever');

-- Insert test organizations (Fixing required columns)
INSERT INTO organizations (id, name, website, phone, email, address, city, state, postcode, country)
VALUES 
(1, 'Test Organization', 'https://testorg.com', '123-456-7890', 'contact@testorg.com', 
'123 Test Street', 'New York', 'NY', '10001', 'USA');

-- Insert test dogs (Ensure `breeds` & `organizations` exist first)
INSERT INTO dogs (name, location, status, breed_id, age, gender, size, color, coat, description, organization_id, image, video)
VALUES 
('Buddy', 'New York', 'adoptable', 1, 'Young', 'Male', 'Medium', 'Yellow', 'Short', 'Friendly and playful', 1, NULL, NULL),
('Bella', 'California', 'adoptable', 2, 'Adult', 'Female', 'Large', 'Black', 'Long', 'Loyal and protective', 1, NULL, NULL);
