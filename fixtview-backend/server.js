const express = require('express');
const cors = require('cors');
const axios = require('axios');
const NodeCache = require( "node-cache" );

const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());

const cache = new NodeCache({stdTTL: 100, checkperiod: 300 });

// Checks cache for requested api endpoint, if data cached then return, else api called & data stored
async function fetchWithCache(key, url, ttlSecs) {
    const isCached = cache.get(key);
    if(isCached) {
        return isCached;
    } else {
        const response = await fplAxios.get(url);
        cache.set(key, response.data, ttlSecs);
        return response.data;
    }
}


// Pre-configured axios instance with headers to imitate api call from browser & FPL site
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
        const data = await fetchWithCache('fixtures', 'https://fantasy.premierleague.com/api/fixtures/', 1800);
        res.json(data);
    } catch (error) {
        console.error('Error fetching fixtures:', error.message);
        res.status(500).json({ error: 'Failed to fetch fixtures' });
    }
});

app.get('/api/teams', async (req, res) => {
    try {
        const data = await fetchWithCache('teams', 'https://fantasy.premierleague.com/api/bootstrap-static/', 86400);
        res.json(data.teams);
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});

app.get('/api/gameweeks', async (req, res) => {
    try {
        const data = await fetchWithCache('gameweeks', 'https://fantasy.premierleague.com/api/bootstrap-static/', 60);
        res.json(data.events);
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