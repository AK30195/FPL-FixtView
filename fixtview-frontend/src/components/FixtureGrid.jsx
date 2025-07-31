import { useFixturesByTeam } from '../hooks/useFixtures';
import TeamFixtureList from './TeamFixtureList'

function FixtureGrid({fixtureRange, rangeStart}) {
    const { fixturesByTeam, loading } = useFixturesByTeam();

    if (loading) return <p>Loading fixtures...</p>;

    return (
        <div className='FixtureGrid'>
            {Object.values(fixturesByTeam).map(({ team, fixtures }) => (
                <TeamFixtureList
                    key={team.id}
                    team={team}
                    fixtures={fixtures}
                    fixtureRange={fixtureRange}
                    rangeStart={rangeStart}
                />
            ))}
        </div>
    )
}


export default FixtureGrid;