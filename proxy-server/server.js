const express = require('express');
const fetch = require('node-fetch'); // or import fetch if using ESM
const app = express();
const PORT = process.env.PORT || 3000;

// Proxy endpoint: Client will call /proxy?url=...
app.get('/proxy', async (req, res) => {
  // Extract the 'url' query parameter from the client's request
  const siteUrl = req.query.url;
  
  if (!siteUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Construct the API endpoint URL. In this case, the website carbon API.
  const apiUrl = `https://api.websitecarbon.com/site?url=${encodeURIComponent(siteUrl)}`;

  try {
    // Fetch data from the API server-side
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching data from API' });
    }

    const data = await response.json();
    // Send the API response data back to the client
    res.json(data);
  } catch (error) {
    console.error("Error in proxy:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
