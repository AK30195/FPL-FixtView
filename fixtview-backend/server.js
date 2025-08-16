const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Allow all origins (or configure if needed)

// Pre-configured axios instance with headers
const fplAxios = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0',
    'Accept': 'application/json,text/plain,*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://fantasy.premierleague.com/',
    'Origin': 'https://fantasy.premierleague.com',
  }
});

app.get('/api/fixtures', async (req, res) => {
    try {
        const response = await fplAxios.get('https://fantasy.premierleague.com/api/fixtures/');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching fixtures:', error.message);
        res.status(500).json({ error: 'Failed to fetch fixtures' });
    }
});

app.get('/api/teams', async (req, res) => {
    try {
        const response = await fplAxios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
        res.json(response.data.teams);
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});

app.get('/api/gameweeks', async (req, res) => {
    try {
        const response = await fplAxios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
        res.json(response.data.events);
    } catch (error) {
        console.error('Error fetching gameweek data:', error.message);
        res.status(500).json({ error: 'Failed to fetch gameweek data' });
    }
});

// Catches unfound endpoints
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Catch all error handler
app.use((err, req, res, next) => {
    console.error('Unexpected error:', err.stack || err.message);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`FPL FixtView server running on http://localhost:${PORT}`);
});