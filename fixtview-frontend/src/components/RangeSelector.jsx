
function RangeSelector({ rangeStart, rangeEnd, rangeMin, selectStart, selectEnd }) {

  const gameweekOptions = []

  for (let i = rangeMin; i <= 38; i++) {
    gameweekOptions.push(i)
  };

  return (
    <div className="RangeSelector">
      <output>Showing {rangeEnd - rangeStart + 1} GWs</output>
      <div>
        <label htmlFor="rangeStartSelector">GW from</label>
        <select name="rangeStart" id="rangeStartSelector" value={rangeStart} onChange={(e) => selectStart(Number(e.target.value))} >
          {gameweekOptions.map((gw) => (
            <option key={gw} value={gw}>
              {gw}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="rangeEndSelector">GW to</label>
        <select name="rangeEnd" id="rangeEndSelector" value={rangeEnd} onChange={(e) => selectEnd(Number(e.target.value))} >
          {gameweekOptions.slice(rangeStart - 1).map((gw) => (
            <option key={gw} value={gw}>
              {gw}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default RangeSelector;