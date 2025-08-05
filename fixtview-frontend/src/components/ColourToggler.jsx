import { HexColorPicker } from "react-colorful";
import { useState } from "react";

function ColourToggler({ diffColours, editColours, addDiffLevel, removeDiffLevel }) {

    const [selectedDiff, setSelectedDiff] = useState(1)
    const initialColour = diffColours[selectedDiff]?.colour || diffColours[1].colour
    const levels = Object.keys(diffColours).map(Number);

    return (
        <div>
            <h2>Rating Colours</h2>
            <p>Choose custom colours for your grid below</p>
            <label htmlFor="level-select">Change colour for difficulty level:</label>
            <select
                id="level-select"
                value={selectedDiff}
                onChange={(e) => setSelectedDiff(e.target.value)}
            >
                {levels.map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>

            <HexColorPicker
                color={initialColour}
                onChange={(newColour) => editColours(Number(selectedDiff), newColour)}
            />
            <button onClick={addDiffLevel}>
                Add colour to FDR
            </button>
            <button onClick={removeDiffLevel} disabled={levels.length <= 5}>
                Remove colour from FDR
            </button>
        </div>
    )
}

export default ColourToggler;