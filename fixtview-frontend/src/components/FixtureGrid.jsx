import { useFixturesByTeam } from '../hooks/useFixtures';
import TeamFixtureList from './TeamFixtureList'

function FixtureGrid({ rangeStart, rangeEnd, diffColours, diffRatings }) {
    const { fixturesByTeam, loading } = useFixturesByTeam();

    if (loading) return <p>Loading fixtures...</p>;

    return (
        <div>
            <table className='flex table table-auto justify-right items-right overflow-visible'>
                <thead className='table-row'>
                    <tr>
                        <td>
                            corner
                        </td>
                    </tr>
                </thead>
                <tbody className='table-row-group' >
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
                </tbody>
            </table>
        </div>
    )
}


export default FixtureGrid;