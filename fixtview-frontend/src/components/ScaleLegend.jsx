
function ScaleLegend({ difficultyColours }) {

    const scaleLevels = Object.keys(difficultyColours).map(Number);
    
    return (
        <div className="legend">
            <h2>Fixture Difficulty Rank(FDR)</h2>
            {scaleLevels.map((level) => (
                <div className="legend-rank" key={level} style={{ backgroundColor: difficultyColours[level].colour }}>
                    <span>{level}</span>
                </div>
                )
            )}
        </div>
    )
}

export default ScaleLegend;