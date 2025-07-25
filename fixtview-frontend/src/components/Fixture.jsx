import '../styles/Fixture.css'

function Fixture({ opponent, isHome, gameweek, difficulty }) {
    return (
        <li >
            {opponent} {isHome ? '(H)' : '(A)'} GW{gameweek} {difficulty}
        </li>
    )
}

export default Fixture