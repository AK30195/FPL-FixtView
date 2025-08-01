import { useFixturesByTeam } from '../hooks/useFixtures';
import Fixture from './Fixture';
import '../styles/TeamFixtureList.css'

function TeamFixturesList({ team, fixtures, rangeStart, rangeEnd, diffColours, diffRatings }) {

  const { fixturesByTeam, loading } = useFixturesByTeam();

  if (loading) return <p>Loading fixtures...</p>;

  return (
    <div className='TeamFixtureList' >
      <h2>{team.name}</h2>
      <ul>
        {fixtures.slice(rangeStart - 1, rangeEnd).map((fixture) => {
          const isHome = fixture.team_h === team.id;
          const opponentId = isHome ? fixture.team_a : fixture.team_h;
          const opponent = fixturesByTeam[opponentId]?.team?.short_name || '';
          const gameweek = fixture.event;
          const difficulty = isHome ? diffRatings[opponentId].home : diffRatings[opponentId].away;
          return (
            <Fixture 
            key={fixture.id} 
            opponent={opponent} 
            isHome={isHome} 
            gameweek={gameweek} 
            difficulty={difficulty} 
            diffColours={diffColours}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TeamFixturesList;