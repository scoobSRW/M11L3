const express = require("express");
const axios = require("axios");
const md5 = require("md5");
const cors = require("cors");  // Import CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (you can also specify allowed origins)
app.use(cors());

// Your Marvel API public and private keys
const PUBLIC_KEY = "051fe289b4b4a2d3c65b0465ff6eb17a";  // Replace with your actual public key
const PRIVATE_KEY = "56d7383a9c9073680fa3ba93e24efcc92af37b50";  // Replace with your actual private key

// Root route (serves a simple message)
app.get("/", (req, res) => {
    res.send("Welcome to the Marvel API server!");
});

// Fetch Marvel data route
app.get("/fetch-marvel-data", (req, res) => {
    console.log('Fetching Marvel Data...'); // Debug log
    const ts = Date.now(); // Generate a new timestamp dynamically
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY); // Generate the hash for Marvel API

    axios
        .get("https://gateway.marvel.com/v1/public/characters", {
            params: {
                ts: ts,
                apikey: PUBLIC_KEY,
                hash: hash,
            },
        })
        .then((response) => {
            console.log('Marvel data fetched successfully'); // Debug log
            res.json(response.data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error fetching data from Marvel API");
        });
});

// Fetch details of a specific character by ID
app.get("/fetch-marvel-data/:characterId", (req, res) => {
    const { characterId } = req.params;
    const ts = Date.now(); // Generate a new timestamp dynamically
    const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY); // Generate the hash for Marvel API

    // Make a request to Marvel's API for a specific character
    axios
        .get(`https://gateway.marvel.com/v1/public/characters/${characterId}`, {
            params: {
                ts: ts,
                apikey: PUBLIC_KEY,
                hash: hash,
            },
        })
        .then((response) => {
            res.json(response.data); // Send the Marvel API response to the frontend
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error fetching character details from Marvel API");
        });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
