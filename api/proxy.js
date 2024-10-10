import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiUrl = 'https://api.thirdparty.com/data';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from the API', details: error.message });
  }
}
