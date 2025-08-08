
function DifficultyToggler({ diffColours, diffRatings, editRatings }) {

    const difficultyLevels = Object.keys(diffColours).map(Number);

    return (
        <div className="diff-toggler-div">
            <h2>Adjust FDR by team</h2>
            <div className="diff-select-div">
                {Object.entries(diffRatings).map(([teamId, team]) => (
                    <div className="team-diff-div" key={teamId}>
                        <div className="team-name-div">
                            <p>{team.name}</p>
                        </div>
                        <div>
                            <label htmlFor={`home-select-${teamId}`}>
                                Home:
                                <select
                                    id={`home-select-${teamId}`}
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
                        </div>
                        <div>
                            <label htmlFor={`away-select-${teamId}`}>
                                Away:
                                <select
                                    id={`away-select-${teamId}`}
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DifficultyToggler;