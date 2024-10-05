-- Database create karein
CREATE DATABASE contactDB;

-- Database ko use karein
USE contactDB;

-- Contacts table create karein
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT
);

SELECT * FROM contacts;
