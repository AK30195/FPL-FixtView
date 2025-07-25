const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Allow all origins (or configure if needed)

app.get('/api/fixtures', async (req, res) => {
  try {
    const response = await axios.get('https://fantasy.premierleague.com/api/fixtures/');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching fixtures:', error.message);
    res.status(500).json({ error: 'Failed to fetch fixtures' });
  }
});

app.get('/api/teams', async (req, res) => {
  try {
    const response = await axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
    res.json(response.data.teams);
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.listen(PORT, () => {
  console.log(`FPL proxy server running on http://localhost:${PORT}`);
});