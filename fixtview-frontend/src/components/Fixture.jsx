function Fixture({ opponent, isHome, difficulty, difficultyColours }) {
  const fixtureColour = difficultyColours[difficulty].colour;
  return (
    <div className="fixture-cell" style={{ backgroundColor: fixtureColour }}>
      {opponent}{isHome ? "(H)" : "(A)"}
    </div>
  );
}

export default Fixture;
