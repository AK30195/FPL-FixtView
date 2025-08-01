import { useFixturesByTeam } from '../hooks/useFixtures';
import TeamFixtureList from './TeamFixtureList'

function FixtureGrid({ rangeStart, rangeEnd, diffColours, diffRatings}) {
    const { fixturesByTeam, loading } = useFixturesByTeam();

    if (loading) return <p>Loading fixtures...</p>;

    return (
        <div className='FixtureGrid'>
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
    )
}


export default FixtureGrid;