import { useFixturesByTeam } from '../hooks/useFixtures';
import TeamFixtureList from './TeamFixtureList'

function FixtureGrid({ rangeStart, rangeEnd, difficultyColours, difficultyRatings }) {
    const { fixturesByTeam, loading } = useFixturesByTeam();

    if (
        loading ||
        !Number.isInteger(rangeStart) ||
        !Number.isInteger(rangeEnd) ||
        rangeEnd < rangeStart
    ) {
        return <p>Loading fixtures...</p>;
    }

    const GWRange = rangeEnd - rangeStart + 1;

    return (
        <div className='grid-container' >
            <div className="grid-inlay">
                <div className='fixture-grid'>
                    <div>
                        <div className="grid-header">
                            <div className='grid-corner'></div>
                            {[...Array(GWRange)].map((_, i) => (
                                <div className='header-cell' key={i}>
                                    GW{rangeStart + i}
                                </div>
                            ))}
                        </div>
                        {Object.values(fixturesByTeam).map(({ team, fixtures }) => (
                            <TeamFixtureList
                                key={team.id}
                                team={team}
                                fixtures={fixtures}
                                rangeStart={rangeStart}
                                rangeEnd={rangeEnd}
                                difficultyColours={difficultyColours}
                                difficultyRatings={difficultyRatings}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FixtureGrid;