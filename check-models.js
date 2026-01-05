// check-models.js
const https = require("https");

// 1. PASTE YOUR API KEY HERE IF IT DOESN'T LOAD FROM ENV
const API_KEY =
  process.env.GEMINI_API_KEY || "AIzaSyCsPdOsErI806td7aWHlaZi2aO_9pljWNw";

if (!API_KEY || API_KEY.startsWith("PASTE_")) {
  console.error("❌ Error: Please paste your API Key inside the script file.");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

https
  .get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      try {
        const json = JSON.parse(data);
        if (json.error) {
          console.error("❌ API Error:", json.error.message);
        } else if (json.models) {
          console.log("\n✅ AVAILABLE MODELS FOR YOUR KEY:");
          console.log("---------------------------------");
          json.models.forEach((m) => {
            // We only care about models that support 'generateContent'
            if (m.supportedGenerationMethods.includes("generateContent")) {
              console.log(`Model Name: "${m.name.replace("models/", "")}"`);
            }
          });
          console.log("---------------------------------\n");
        } else {
          console.log("No models found.");
        }
      } catch (e) {
        console.error("Parse Error:", e.message);
      }
    });
  })
  .on("error", (e) => {
    console.error("Network Error:", e.message);
  });
