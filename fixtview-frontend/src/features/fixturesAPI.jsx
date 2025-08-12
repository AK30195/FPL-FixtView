import axios from 'axios';

export async function getFixtures() {
  try {
    const res = await axios.get('https://fpl-fixtview.onrender.com/api/fixtures');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch fixtures:', error);
    throw error;
  }
}

export async function getTeams() {
  try {
    const res = await axios.get('https://fpl-fixtview.onrender.com/api/teams');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw error;
  }
}

export async function getNextGameweek() {
  try {
    const res = await axios.get('https://fpl-fixtview.onrender.com/api/gameweeks');
    const nextGameweek = res.data.find(event => event.is_next);
    return nextGameweek ? nextGameweek.id : null;
  } catch (error) {
    console.error('Error fetching current gameweek:', error);
    return null;
  }
}