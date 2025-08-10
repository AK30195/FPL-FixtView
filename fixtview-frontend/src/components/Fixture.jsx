function Fixture({ opponent, isHome, gameweek, difficulty, diffColours }) {
  const fixtureColour = diffColours[difficulty].colour;
  return (
    <div className="fixture-cell" style={{ backgroundColor: fixtureColour }}>
      {opponent} {isHome ? "(H)" : "(A)"}
    </div>
  );
}

export default Fixture;
