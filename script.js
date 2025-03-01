// URL of the API endpoint
const apiURL = "https://api.websitecarbon.com/";

document.addEventListener("DOMContentLoaded", function()) {
    // Get reference to DOM elements (objects that represent parts of webpage)
    const form = document.getElementById("siteForm")
    const urlInput = document.getElementById("urlInput")
    const dataContainer = document.getElementById("dataContainer")

    // Listen for form submission
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
        const siteUrl = urlInput.value.trim();
        
        if (siteUrl) {
          fetchSiteData(siteUrl);
        } else {
          dataContainer.innerHTML = "<p>Please enter a valid URL.</p>";
        }
      });

      // Function to fetch data from /site endpoint
      function fetchData(siteUrl) {
        // const container = document.getElementById('data-container');
        // Get endpoint /site?url={xxx}
        // encodedURIComponent ensures representation in UTF-8 encoding and
        // special characters do not interfere with URL structure
        const endpoint = '/site?url=${encodeURIComponent(siteURL)}';

        // Show loading message
        container.innerHTML = "<p>Loading...</p>";
    
        // Use the fetch function to make an HTTP request to fetch resources
        fetch(apiURL)
        .then(response => {
            if(!response.ok) {
                // Check if the request was successful
                throw new Error("Could not fetch resource");
            }
        
            // Parse the JSON data from the response
            return response.json();
           })
           .then(data => {
             // Handle the data from the API
             displayData(data);
            //  const url = data.url;
            //  const green = data.green;
            //  const bytes = data.bytes;
            //  const cleanerThan = data.cleanerThan;
            //  const stats = data.statistics;
             
           })
           .catch(error => {
             // Handle any errors that occurred during the fetch
             console.log("There was an error with the fetch operation: ", error);
             dataContainer.innerHTML = "<p>Error fetching data: ${error.message}</p>";
           })
    }
}

function displayData(data) {
    const html = `
    <h2>Site Carbon Test Results</h2>
    <p><strong>URL:</strong> <a href="${data.url}" target="_blank">${data.url}</a></p>
    <p><strong>Green:</strong> ${data.green}</p>
    <p><strong>Bytes:</strong> ${data.bytes}</p>
    <p><strong>Cleaner Than:</strong> ${data.cleanerThan}</p>
    <h3>Statistics</h3>
    <p><strong>Adjusted Bytes:</strong> ${data.statistics.adjustedBytes}</p>
    <p><strong>Energy:</strong> ${data.statistics.energy}</p>
    <h4>CO₂ Emissions</h4>
    <p><strong>Grid (grams):</strong> ${data.statistics.co2.grid.grams}</p>
    <p><strong>Grid (litres):</strong> ${data.statistics.co2.grid.litres}</p>
    <p><strong>Renewable (grams):</strong> ${data.statistics.co2.renewable.grams}</p>
    <p><strong>Renewable (litres):</strong> ${data.statistics.co2.renewable.litres}</p>
    `;
    dataContainer.innerHTML = html;
}