function Fixture({ opponent, isHome, difficulty, difficultyColours }) {
  const fixtureColour = difficultyColours[difficulty]?.colour ?? "#c9c8c7";
  return (
    <div className="fixture-cell" style={{ backgroundColor: fixtureColour }}>
      {opponent}{isHome ? "(H)" : "(A)"}
    </div>
  );
}

export default Fixture;
