import fetch from 'node-fetch';

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  if (req.method === 'OPTIONS') {
    res.status(200).end(); // Handle preflight requests
    return;
  }
  
  return await fn(req, res);
};

const handler = async (req, res) => {
  const { query } = req.query; // Extract the query from the request
  const apiKey = process.env.NEWS_API_KEY; // Use your environment variable here
  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl); // Fetch from the third-party API
    const data = await response.json();
    res.status(200).json(data); // Send the response data back to the client
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the API', details: error.message });
  }
};

module.exports = allowCors(handler); // Export the CORS-wrapped handler
