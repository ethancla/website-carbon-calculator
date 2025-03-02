import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 9000;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// Route for root path
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Proxy Server</h1><p>This is the homepage of the server.</p>');
  });

app.get('/proxy', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }

    console.log(`Fetching URL: ${url}`); // Debugging log

    try {
        const response = await fetch(url);
        
        // Check if the response is okay (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();  // Get the raw response text
        console.log("Raw response:", text);   // Log the raw response

        // If the response is JSON, parse it
        const data = JSON.parse(text); // or response.json() if it is guaranteed to be JSON
        res.json(data);

    } catch (error) {
        console.error("Error fetching data:", error.message);  // Log the error message
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
