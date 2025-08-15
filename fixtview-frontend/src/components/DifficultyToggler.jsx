
function DifficultyToggler({ difficultyColours, difficultyRatings, editRatings, gridView }) {

    const difficultyLevels = Object.keys(difficultyColours).map(Number);

    return (
        <div className="diff-toggler-div">
            <h2>Adjust Team FDR Ratings</h2>
            <div className="diff-select-div">
                {Object.entries(difficultyRatings).map(([teamId, team]) => (
                    <div className="team-diff-div" key={teamId}>
                        <div className="team-name-div">
                            <p>{team.name}</p>
                        </div>
                        <div>
                            <label htmlFor={`home-select-${teamId}`}>
                                Home
                                <select
                                    id={`home-select-${teamId}`}
                                    value={team.home}
                                    onChange={(e) => editRatings(Number(teamId), 'home', Number(e.target.value), gridView)}
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
                                Away
                                <select
                                    id={`away-select-${teamId}`}
                                    value={team.away}
                                    onChange={(e) => editRatings(Number(teamId), 'away', Number(e.target.value), gridView)}
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