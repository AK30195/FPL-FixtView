
function DifficultyToggler({ diffColours, diffRatings, editRatings }) {
    
    const difficultyLevels = Object.keys(diffColours).map(Number);

    return (
        <div>
            <h2>Adjust FDR by team</h2>
            {Object.entries(diffRatings).map(([teamId, team]) => (
                <div key={teamId}>
                    <span>{team.name} - </span>
                    <label>
                        Home:
                        <select
                            value={team.home}
                            onChange={(e) => editRatings(Number(teamId), 'home', Number(e.target.value))}
                        >
                            {difficultyLevels.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Away:
                        <select
                            value={team.away}
                            onChange={(e) => editRatings(Number(teamId), 'away', Number(e.target.value))}
                        >
                            {difficultyLevels.map((level) => (
                                <option key={level} value={level}>
                                    {level}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default DifficultyToggler;