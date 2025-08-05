import { useState, useEffect } from 'react';
import DifficultyToggler from './components/DifficultyToggler';
import FixtureGrid from './components/FixtureGrid';
import RangeSelector from './components/RangeSelector';
import ColourToggler from './components/ColourToggler';
import ScaleLegend from './components/ScaleLegend';
import { getNextGameweek } from './features/fixturesAPI';
import { defaultDifficultyColours, defaultTeamDiffRatings } from './utils/defaultDifficultySettings';

function App() {

  const [difficultyColours, setDifficultyColours] = useState(defaultDifficultyColours);
  const [difficultyRatings, setDifficultyRatings] = useState(defaultTeamDiffRatings);
  const [rangeEnd, setRangeEnd] = useState(38);
  const [rangeStart, setRangeStart] = useState();
  const [rangeMin, setRangeMin] = useState();

  useEffect(() => {
    async function fetchNextGameweek() {
      const nextGW = await getNextGameweek();
      if (nextGW !== null) {
        setRangeStart(nextGW);
        setRangeMin(nextGW);
      }
    }

    fetchNextGameweek();
  }, []);

  const selectRangeStart = (start) => {
    if (start > rangeEnd) {
      setRangeEnd(start);
      setRangeStart(start);
    } else {
      setRangeStart(start)
    }
  };

  const selectRangeEnd = (end) => {
    if (end < rangeStart) {
      setRangeStart(end);
      setRangeEnd(end)
    } else {
      setRangeEnd(end);
    }
  }

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
    setDifficultyColours(prev => ({
      ...prev,
      [diffLevel]: { colour: newColour }
    }));
  };

  const addDifficultyLevel = () => {
    // Add level & assign defualt neutral gray
    setDifficultyColours(prev => ({
      ...prev,
      [Math.max(...Object.keys(prev).map(Number)) + 1]: { colour: '#c9c8c7' }
    }));
  };

  const removeDifficultyLevel = () => {
    setDifficultyColours(prevColours => {
      const levels = Object.keys(prevColours).map(Number);
      if (levels.length <= 5) return prevColours; // Minimum 5 level scale

      // Get highest point on difficulty scale
      const maxLevel = Math.max(...levels);

      // Account for teams that are currently assigned max difficulty rating
      setDifficultyRatings(prevRatings => {
        const updated = { ...prevRatings };

        for (const teamId in updated) {
          const team = updated[teamId];

          // If team had the removed difficulty rating, downgrade it
          if (team.home === maxLevel) team.home = maxLevel - 1;
          if (team.away === maxLevel) team.away = maxLevel - 1;
        }

        return updated;
      });

      // Remove the highest difficulty level
      const updated = { ...prevColours };
      delete updated[maxLevel];
      return updated;
    });
  };

  return (
    <div className='bg-blue-200 flex flex-col items-center justify-center'>
      <h1>FPL FixtView</h1>
      <div id="controls" className='grid grid-cols-2 md:grid-cols-3'>
        <ScaleLegend
          diffColours={difficultyColours}
        />
        <ColourToggler
          diffColours={difficultyColours}
          editColours={editColours}
          addDiffLevel={addDifficultyLevel}
          removeDiffLevel={removeDifficultyLevel}
        />
        <DifficultyToggler
          diffColours={difficultyColours}
          diffRatings={difficultyRatings}
          editRatings={editRatings}
        />
      </div>
      <RangeSelector
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        rangeMin={rangeMin}
        selectStart={selectRangeStart}
        selectEnd={selectRangeEnd}
      />
      <FixtureGrid
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        diffColours={difficultyColours}
        diffRatings={difficultyRatings}
      />
    </div>
  )
}

export default App
