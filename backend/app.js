// app.js

// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Define a basic route
app.get('/', (req, res) => {
    res.send('Hello, Business Vista!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
