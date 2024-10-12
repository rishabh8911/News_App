export default async function handler(req, res) {
    const API_KEY = process.env.NEWS_API_KEY
    const url = "https://newsapi.org/v2/everything?q="
    const { query } = req.query
  
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' })
    }
  
    try {
      const response = await fetch(`${url}${query}&apiKey=${API_KEY}`)
      const data = await response.json()
  
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch news' })
    }
  }