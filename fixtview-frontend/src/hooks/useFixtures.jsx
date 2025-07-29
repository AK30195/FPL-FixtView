import { useEffect, useState } from 'react';
import { getFixtures, getTeams, getNextGameweek } from '../features/fixturesAPI';

export function useFixturesByTeam() {
  const [fixturesByTeam, setFixturesByTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fixtures, teams] = await Promise.all([getFixtures(), getTeams()]);
        const nextGameweek =  await getNextGameweek();
        
        const grouped = {};

        teams.forEach((team) => {
           const teamFixtures = fixtures.filter(
            (fix) => (fix.event >= nextGameweek) && (fix.team_h === team.id || fix.team_a === team.id)
          );

          grouped[team.id] = {
            team,
            fixtures: teamFixtures.map(fix => ({
              ...fix,
              isHome: fix.team_h === team.id,
              opponent: fix.team_h === team.id ? fix.team_a : fix.team_h
            })),
          };
        });

        setFixturesByTeam(grouped);
      } catch (error) {
        console.error('Error loading fixture data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { fixturesByTeam, loading };
}