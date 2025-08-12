import { useState, useEffect } from 'react';
import DifficultyToggler from './components/DifficultyToggler';
import FixtureGrid from './components/FixtureGrid';
import RangeSelector from './components/RangeSelector';
import ColourToggler from './components/ColourToggler';
import ScaleLegend from './components/ScaleLegend';
import { getNextGameweek } from './features/fixturesAPI';
import { defaultDifficultyColours, defaultTeamDiffRatings } from './utils/defaultDifficultySettings';
import ResetButton from './components/ResetButton';
import ControlsButton from './components/ControlsButton';

function App() {

  // Get state for FDR colours & ratings from either localStorage or defaults
  const [difficultyColours, setDifficultyColours] = useState(() => {
    const savedState = localStorage.getItem('difficultyColours');
    return savedState ? JSON.parse(savedState) : defaultDifficultyColours;
  });
  const [difficultyRatings, setDifficultyRatings] = useState(() => {
    const savedState = localStorage.getItem('difficultyRatings');
    return savedState ? JSON.parse(savedState) : defaultTeamDiffRatings;
  });

  // State for fixture range selection
  const [rangeEnd, setRangeEnd] = useState(38);
  const [rangeStart, setRangeStart] = useState();
  const [rangeMin, setRangeMin] = useState();

  // State for showing/hiding control features
  const [showControls, setShowControls] = useState(true);

  // Load next gameweek into state by calling api
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

  // Update localStorage whenever FDR colours/ratings changed by user
  useEffect(() => {
    localStorage.setItem('difficultyColours', JSON.stringify(difficultyColours));
  }, [difficultyColours]);

  useEffect(() => {
    localStorage.setItem('difficultyRatings', JSON.stringify(difficultyRatings));
  }, [difficultyRatings]);

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
      if (levels.length <= 2) return prevColours; // Minimum 2 level scale

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


  const resetSettings = () => {
    // Ensures react gets new object reference to re-render
    setDifficultyRatings(JSON.parse(JSON.stringify(defaultTeamDiffRatings)));
    setDifficultyColours(JSON.parse(JSON.stringify(defaultDifficultyColours)));
    
    localStorage.setItem('difficultyColours', JSON.stringify(defaultDifficultyColours));
    localStorage.setItem('difficultyRatings', JSON.stringify(defaultTeamDiffRatings));
  };

  return (
    <>
      <div className='header'>
        <div className='logo-div'>
          <h1>FPL FixtView</h1>
        </div>
        <div className='header-buttons-div'>
          <ResetButton
            resetSettings={resetSettings}
          />
          <ControlsButton
            showControls={showControls}
            setShowControls={setShowControls}
          />
        </div>
      </div>
      {showControls && (
        <div className='controls-div'>
          <ScaleLegend
            difficultyColours={difficultyColours}
          />
          <ColourToggler
            difficultyColours={difficultyColours}
            editColours={editColours}
            addDiffLevel={addDifficultyLevel}
            removeDiffLevel={removeDifficultyLevel}
          />
          <DifficultyToggler
            difficultyColours={difficultyColours}
            difficultyRatings={difficultyRatings}
            editRatings={editRatings}
          />
        </div>
      )}
      <div className='range-select-div'>
        <RangeSelector
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          rangeMin={rangeMin}
          selectStart={selectRangeStart}
          selectEnd={selectRangeEnd}
        />
      </div>
      <FixtureGrid
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        difficultyColours={difficultyColours}
        difficultyRatings={difficultyRatings}
      />
    </>
  )
}

export default App
