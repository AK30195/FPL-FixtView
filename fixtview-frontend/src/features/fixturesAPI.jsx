import axios from 'axios';

export async function getFixtures() {
  try {
    const res = await axios.get('http://localhost:4000/api/fixtures');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch fixtures:', error);
    throw error;
  }
}

export async function getTeams() {
  try {
    const res = await axios.get('http://localhost:4000/api/teams');
    return res.data;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw error;
  }
}