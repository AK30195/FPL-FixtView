function Fixture({ opponent, isHome, gameweek, difficulty, diffColours }) {
  const fixtureColour = diffColours[difficulty].colour;
  return (
    <div style={{ backgroundColor: fixtureColour }}>
      {opponent} {isHome ? "(H)" : "(A)"} GW{gameweek}
    </div>
  );
}

export default Fixture;
