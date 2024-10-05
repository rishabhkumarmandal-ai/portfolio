const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Route to handle form submission
app.post('/portfolio--DB.js', (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    newContact.save()
        .then(() => res.send('Data stored successfully!'))
        .catch(err => res.status(400).send('Error: ' + err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const express = require('express');
const fs = require('fs');
const fastCsv = require('fast-csv');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/portfolio--DB.js', (req, res) => {
    const { name, email, message } = req.body;
    
    // Prepare data to be written in CSV format
    const data = [[name, email, message]];

    const csvFilePath = path.join(__dirname, 'contacts.csv');
    const writeStream = fs.createWriteStream(csvFilePath, { flags: 'a' }); // Append mode

    fastCsv
        .write(data, { headers: false })
        .pipe(writeStream)
        .on('finish', () => {
            res.send('Data stored successfully in contacts.csv!');
        })
        .on('error', (error) => {
            res.status(500).send('Error: ' + error);
        });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
