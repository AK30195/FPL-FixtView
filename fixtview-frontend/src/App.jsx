
import './styles/App.css';
import { useState } from 'react';
import DifficultyToggler from './components/DifficultyToggler';
import FixtureGrid from './components/FixtureGrid';
import RangeSelector from './components/RangeSelector'
import { getNextGameweek } from './features/fixturesAPI';


function App() {

  const [difficultySettings, setDifficultySettings] = useState([{}]);
  const [fixtureRange, setFixtureRange] = useState(10);

  return (
    <div>
      <h1>FPL FixtView</h1>
      <FixtureGrid
        diffSettings={difficultySettings}
        fixtureRange={fixtureRange}
      />
      <RangeSelector
        fixtureRange={fixtureRange}
        onChange={setFixtureRange}
      />
      <DifficultyToggler
        diffSettings={difficultySettings}
        onChange={setDifficultySettings}
      />
    </div>
  )
}

export default App
