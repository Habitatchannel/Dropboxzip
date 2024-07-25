const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

// Endpoint to fetch Dropbox access token securely
app.get('/getDropboxToken', (req, res) => {
    const dropboxAccessToken = process.env.DROPBOX_ACCESS_TOKEN; // Fetch from environment variables
    res.json({ dropboxAccessToken });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
