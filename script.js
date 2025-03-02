const token = "vy18p8ypl1.cm7r1f1vy018o8hpy8qngvum91eb23c0b.de0a5bfd3ec26120";
const siteID = "vy18p8ypl1";
// URL of the API endpoint
const apiURL = "https://api.ecoping.earth/v2/reports/sites/${siteURL}/impact";
document.getElementById("siteForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from refreshing the page

  const urlInput = document.getElementById("url"); // Make sure this ID matches your HTML input field
  const siteURL = urlInput.value.trim(); // Get the user input

  if (!siteURL) {
      console.error("No URL provided!");
      return;
  }

  console.log("Fetching data for:", siteURL); // Debugging log

  const endpoint = `${apiURL}?token=${token}&url=${encodeURIComponent(siteURL)}`;

  try {
      console.log("line 19");
      const response = await fetch(endpoint);
      console.log("line 21");
      if (!response.ok) throw new Error("Failed to fetch resource");

      const data = await response.json();
      console.log("Received Data:", data); // Debugging log

      // Output data to the page
      displayData(data);
  } catch (error) {
      console.error("There was an error with the fetch operation:", error);
  }
});

function displayData(data) {
    const dataContainer = document.getElementById("dataContainer");

    if (!dataContainer) {
      console.error("Error: #dataContainer element not found.");
      return;
    }

    console.log("line 42");
    const html = `
    <h2>Site Carbon Test Results</h2>
    <p><strong>URL:</strong> <a href="${data.url}" target="_blank">${data.url}</a></p>
    <p><strong>Ecoscore:</strong> ${data.ecoscore}</p>`;
    // <p><strong>Bytes:</strong> ${data.bytes}</p>
    // <p><strong>Cleaner Than:</strong> ${data.cleanerThan}</p>
    // <h3>Statistics</h3>
    // <p><strong>Adjusted Bytes:</strong> ${data.statistics.adjustedBytes}</p>
    // <p><strong>Energy:</strong> ${data.statistics.energy}</p>
    // <h4>CO₂ Emissions</h4>
    // <p><strong>Grid (grams):</strong> ${data.statistics.co2.grid.grams}</p>
    // <p><strong>Grid (litres):</strong> ${data.statistics.co2.grid.litres}</p>
    // <p><strong>Renewable (grams):</strong> ${data.statistics.co2.renewable.grams}</p>
    // <p><strong>Renewable (litres):</strong> ${data.statistics.co2.renewable.litres}</p>
    // `;
    console.log("line 58");
    dataContainer.innerHTML = html;
}