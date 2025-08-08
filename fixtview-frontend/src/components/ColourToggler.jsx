import { HexColorPicker } from "react-colorful";
import { useState } from "react";

function ColourToggler({ diffColours, editColours, addDiffLevel, removeDiffLevel }) {

    const [selectedDiff, setSelectedDiff] = useState(1)
    const initialColour = diffColours[selectedDiff]?.colour || diffColours[1].colour
    const levels = Object.keys(diffColours).map(Number);

    return (
        <div className="colour-toggle-div">
            <h2>Customise FDR Colours</h2>
            <label htmlFor="level-select">Change FDR colour:</label>
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
            <div className="color-picker-div" >
                <HexColorPicker
                    className="color-picker"
                    color={initialColour}
                    onChange={(newColour) => editColours(Number(selectedDiff), newColour)}
                />
            </div>

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