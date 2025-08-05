
function Fixture({ opponent, isHome, gameweek, difficulty, diffColours }) {

    const fixtureColour = diffColours[difficulty].colour;
    return (
        <td style={{backgroundColor: fixtureColour}}>
            <span>
                {opponent} {isHome ? '(H)' : '(A)'} GW{gameweek}    
            </span>
        </td>

    )
}

export default Fixture