
import './styles/App.css';
import { useState, useEffect } from 'react';
import DifficultyToggler from './components/DifficultyToggler';
import FixtureGrid from './components/FixtureGrid';
import RangeSelector from './components/RangeSelector';
import ColourToggler from './components/ColourToggler';
import { getNextGameweek } from './features/fixturesAPI';
import { defaultDifficultyColours, defaultTeamDiffRatings } from './utils/defaultDifficultySettings';



function App() {

  const [difficultyColours, setDifficultyColours] = useState(defaultDifficultyColours);
  const [difficultyRatings, setDifficultyRatings] = useState(defaultTeamDiffRatings);
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
  };

  const editRatings = (teamId, venue, value) => {
  setDifficultyRatings(prev => ({
    ...prev,
    [teamId]: {
      ...prev[teamId],
      [venue]: value
    }
  }));
};

const editColours = (diffLevel, newColour) => {
  console.log(newColour);
  setDifficultyColours(prev => ({
    ...prev,
    [diffLevel]: {colour: newColour}
  }));
};

  return (
    <div>
      <h1>FPL FixtView</h1>
      <FixtureGrid
        fixtureRange={fixtureRange}
        rangeStart={rangeStart}
        diffColours={difficultyColours}
        diffRatings={difficultyRatings}
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
        diffColours={difficultyColours}
        diffRatings={difficultyRatings}
        editRatings={editRatings}
      />
      <ColourToggler 
        diffColours={difficultyColours}
        editColours={editColours}
      />
    </div>
  )
}

export default App
