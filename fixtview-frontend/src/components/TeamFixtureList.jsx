import { useFixturesByTeam } from "../hooks/useFixtures";
import Fixture from "./Fixture";

function TeamFixturesList({ team, fixtures, rangeStart, rangeEnd, 
  difficultyColours, difficultyRatings, }) {

  const { fixturesByTeam, loading } = useFixturesByTeam();
  

  if (loading) return <p>Loading fixtures...</p>;

  return (
    <div className="fixture-list">
      <div className="team-cell">{team.short_name}</div>
      {fixtures.slice(rangeStart - 1, rangeEnd).map((fixture) => {
        const isHome = fixture.team_h === team.id;
        const opponentId = isHome ? fixture.team_a : fixture.team_h;
        const opponent = fixturesByTeam[opponentId]?.team?.short_name || "";
        const gameweek = fixture.event;
        const difficulty = isHome
          ? difficultyRatings[opponentId].home
          : difficultyRatings[opponentId].away;
        return (
          <Fixture
            key={fixture.id}
            opponent={opponent}
            isHome={isHome}
            gameweek={gameweek}
            difficulty={difficulty}
            difficultyColours={difficultyColours}
          />
        );
      })}
    </div>
  );
}

export default TeamFixturesList;
