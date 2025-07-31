
function RangeSelector({ fixtureRange, setRange, rangeStart, rangeMin, selectStart, incrementRange, decrementRange}) {

  const gameweekOptions = []

  for(let i = rangeMin; i <= 38; i ++) {
    gameweekOptions.push(i)
  };

  return (
    <div className="RangeSelector">
      <output>Showing {fixtureRange} GWs</output>
      <button 
      onClick={incrementRange}
      disabled={rangeStart + fixtureRange >= 39}>
        +1
      </button>
      <button 
      onClick={decrementRange}
      disabled={(rangeStart < rangeMin || fixtureRange <= 1)}>
        -1
      </button>
      <button 
      onClick={() => setRange(5)}
      disabled={(rangeStart + 5) > 39}
        >
        5GWs
      </button>
      <button 
      onClick={() => setRange(10)}
      disabled={(rangeStart + 10) > 39}
        >
        10GWs
      </button>
      <button 
      onClick={() => setRange(15)}
      disabled={(rangeStart + 15) > 39}
        >
        15GWs
      </button>
      <button 
      onClick={() => {selectStart(rangeMin), setRange(39 - rangeMin)}}
        >
        All
      </button>
      <div>
        <label htmlFor="rangeStartSelector">View from GW</label>
      <select name="rangeStart" id="rangeStartSelector" value={rangeStart} onChange={(e) => selectStart(Number(e.target.value))} >
        {gameweekOptions.map((gw) => (
          <option key={gw} value={gw}>
            {gw}
          </option>
        ))}
      </select>
      <span> onwards</span>
      </div>
    </div>
  );
}

export default RangeSelector;