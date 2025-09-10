import { useFixturesByTeam } from "../hooks/useFixtures";
import Fixture from "./Fixture";


function TeamFixturesList({ team, fixtures, rangeStart, rangeEnd, rangeMin, 
  difficultyColours, difficultyRatings, }) {

  const { fixturesByTeam, loading } = useFixturesByTeam();

  if (loading) return <p>Loading fixtures...</p>;

  return (
    <div className="fixture-list">
      <div className="team-cell">
        <img className="crest-svg" src={`/crests/${team.id}.svg`} alt="" loading="lazy" />
      </div>

      {/*Fixtures returned from FPL API includes last completed fixture and remaining unplayed fixtures,
      So if next GW is GW4 there will be GW3-38 returned i.e. an array with 36 elements where array[0] contains
      data for GW 3. So if the rangeStart is set at 5 and next is GW4(rangeMin = 4) then 
      rangeStart(5) - rangeMin(4) + 1 = 2, retrieves array[2] which holds data for GW5. This logic is
      used to start and end values for slice method below.*/}
      {fixtures.slice(rangeStart - rangeMin + 1, rangeEnd - rangeMin + 2).map((fixture) => {
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
