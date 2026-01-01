// =======================
// server.js
// =======================

const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

// App initialization
const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Environment variable check
const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error("❌ ERROR: OPENWEATHER_API_KEY is missing in .env file");
  process.exit(1);
}

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Weather API is running");
});

// Weather API route
app.get("/api/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ message: "City name is required" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric"
        }
      }
    );

    const data = response.data;

    // Clean & structured response (DTO)
    const cleanWeather = {
      city: data.name,
      country: data.sys.country,
      temperature: `${data.main.temp} °C`,
      feelsLike: `${data.main.feels_like} °C`,
      weather: data.weather[0].description,
      humidity: `${data.main.humidity} %`,
      windSpeed: `${data.wind.speed} m/s`,
      visibility: `${data.visibility / 1000} km`
    };

    res.status(200).json(cleanWeather);

  } catch (error) {
    res.status(404).json({ message: "City not found or API error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
