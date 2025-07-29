import { useFixturesByTeam } from '../hooks/useFixtures';
import Fixture from './Fixture';
import '../styles/TeamFixtureList.css'

function TeamFixturesList({ team, fixtures, fixtureRange }) {
  const { fixturesByTeam, loading } = useFixturesByTeam();

  if (loading) return <p>Loading fixtures...</p>;

  return (
    <div className='TeamFixtureList' >
      <h2>{team.name}</h2>
      <ul>
        {fixtures.slice(0, fixtureRange).map((fixture) => {
          const isHome = fixture.team_h === team.id;
          const opponentId = isHome ? fixture.team_a : fixture.team_h;
          const opponent = fixturesByTeam[opponentId]?.team?.name || '';
          const gameweek = fixture.event;
          const difficulty = isHome ? fixture.team_h_difficulty : fixture.team_a_difficulty;
          return (
            <Fixture key={fixture.id} opponent={opponent} isHome={isHome} gameweek={gameweek} difficulty={difficulty} />
          );
        })}
      </ul>
    </div>
  );
}

export default TeamFixturesList;