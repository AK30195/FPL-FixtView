
function RangeSelector({ fixtureRange, onChange, min = 1, max = 10 }) {
  return (
    <div className="RangeSelector">
      <label htmlFor="fixtureRange">Fixtures to display: {fixtureRange}</label>
      <input
        type="range"
        id="fixtureRange"
        min={min}
        max={max}
        value={fixtureRange}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input 
      type="number"
      id="fixtureRangeStart"
      value={1}
      />
    </div>
  );
}

export default RangeSelector;