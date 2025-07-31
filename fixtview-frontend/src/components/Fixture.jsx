import '../styles/Fixture.css'

function Fixture({ opponent, isHome, gameweek, difficulty, diffColours }) {

    const fixtureColour = diffColours[difficulty].colour;
    return (
        <div style={{backgroundColor: fixtureColour}}>
            <span>
                {opponent} {isHome ? '(H)' : '(A)'} GW{gameweek} {difficulty}    
            </span>
        </div>

    )
}

export default Fixture