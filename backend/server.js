import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY;

app.use(cors());

app.get('/news', async (req, res) => {
  const query = req.query.q || 'India';
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

  try {
    // Fetch news from the API
    const response = await fetch(url);

    // Check if the response is okay
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('Fetched data:', data);
    // Send the data as JSON
    res.json(data);
  } catch (error) {
    // Log error and send a response
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
