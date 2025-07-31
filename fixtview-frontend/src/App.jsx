
import './styles/App.css';
import { useState, useEffect } from 'react';
import DifficultyToggler from './components/DifficultyToggler';
import FixtureGrid from './components/FixtureGrid';
import RangeSelector from './components/RangeSelector'
import { getNextGameweek } from './features/fixturesAPI';


function App() {

  const [difficultySettings, setDifficultySettings] = useState([{}]);
  const [fixtureRange, setFixtureRange] = useState();
  const [rangeStart, setRangeStart] = useState();
  const [rangeMin, setRangeMin] = useState();

  useEffect(() => {
    async function fetchNextGameweek() {
      const nextGW = await getNextGameweek();
      if (nextGW !== null) {
        setRangeStart(nextGW);
        setRangeMin(nextGW);
        if(nextGW <= 34) {
          setFixtureRange(5)
        } else {
          setFixtureRange(39 - nextGW)
        }
      }
    }

    fetchNextGameweek();
  }, []);

  const incrementRange = () => {
     setFixtureRange((prev) => prev + 1
  )};

  const decrementRange = () => {
     setFixtureRange((prev) => prev - 1
  )};

  const setRange = (num) => {
      setFixtureRange(num)
  };

  const selectRangeStart = (start) => {
    if(39 - start < fixtureRange) {
      setRangeStart(start);
      setFixtureRange(39 - start);
    } else {
      setRangeStart(start);
    }
  }

  return (
    <div>
      <h1>FPL FixtView</h1>
      <FixtureGrid
        diffSettings={difficultySettings}
        fixtureRange={fixtureRange}
        rangeStart={rangeStart}
      />
      <RangeSelector
        fixtureRange={fixtureRange}
        setRange={setRange}
        rangeStart={rangeStart}
        rangeMin={rangeMin}
        selectStart={selectRangeStart}
        incrementRange={incrementRange}
        decrementRange={decrementRange}
      />
      <DifficultyToggler
        diffSettings={difficultySettings}
        onChange={setDifficultySettings}
      />
    </div>
  )
}

export default App
