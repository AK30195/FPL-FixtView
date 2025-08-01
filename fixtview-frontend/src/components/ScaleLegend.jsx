
function ScaleLegend({ diffColours }) {

    const scaleLevels = Object.keys(diffColours).map(Number);
    
    return (
        <div>
            <h2>Fixture Difficulty Rank(FDR)</h2>
            {scaleLevels.map((level) => (
                <div key={level} style={{ backgroundColor: diffColours[level].colour }}>
                    <span>{level}</span>
                </div>
                )
            )}
        </div>
    )
}

export default ScaleLegend;