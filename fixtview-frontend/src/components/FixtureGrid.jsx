import { useFixturesByTeam } from '../hooks/useFixtures';
import TeamFixtureList from './TeamFixtureList'

function FixtureGrid({ rangeStart, rangeEnd, diffColours, diffRatings }) {
    const { fixturesByTeam, loading } = useFixturesByTeam();
    const gridCols = rangeEnd - rangeStart;

    if (loading) return <p>Loading fixtures...</p>;

    return (
        <div className={`grid grid-cols-${gridCols}`}>
            <div  >
                {Object.values(fixturesByTeam).map(({ team, fixtures }) => (
                    <TeamFixtureList
                        key={team.id}
                        team={team}
                        fixtures={fixtures}
                        rangeStart={rangeStart}
                        rangeEnd={rangeEnd}
                        diffColours={diffColours}
                        diffRatings={diffRatings}
                    />
                ))}
            </div>

        </div>
    )
}


export default FixtureGrid;