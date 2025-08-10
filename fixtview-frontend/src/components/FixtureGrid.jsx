import { useFixturesByTeam } from '../hooks/useFixtures';
import TeamFixtureList from './TeamFixtureList'

function FixtureGrid({ rangeStart, rangeEnd, diffColours, diffRatings }) {
    const { fixturesByTeam, loading } = useFixturesByTeam();
    const GWRange = rangeEnd - rangeStart + 1;

    if (loading) return <p>Loading fixtures...</p>;

    return (
        <div className='grid-container' >
            <div className="grid-header">
                <div className='grid-corner'></div>
                {[...Array(GWRange)].map((_, i) => (
                    <div className='header-cell' key={i}>
                        GW{rangeStart + i}
                    </div>
                ))}
            </div>
            <div className='fixture-grid'>
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