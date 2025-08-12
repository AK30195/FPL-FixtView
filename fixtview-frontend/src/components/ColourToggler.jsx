import { HexColorPicker } from "react-colorful";
import { useState } from "react";

function ColourToggler({ difficultyColours, editColours, addDiffLevel, removeDiffLevel }) {

    const [selectedDiff, setSelectedDiff] = useState(1)
    const initialColour = difficultyColours[selectedDiff]?.colour || difficultyColours[1].colour
    const levels = Object.keys(difficultyColours).map(Number);

    return (
        <div className="colour-toggle-div">
            <div className="flex-center">
                <h2>Customise FDR Colours</h2>
            </div>
            <div className="flex-center">
                <label htmlFor="level-select">FDR colour</label>
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
            </div>

            <div className="color-picker-div" >
                <HexColorPicker
                    className="color-picker"
                    color={initialColour}
                    onChange={(newColour) => editColours(Number(selectedDiff), newColour)}
                />
            </div>
            <div className="flex-center">
                <button onClick={addDiffLevel}>
                    Add Colour
                </button>
                <button onClick={removeDiffLevel} disabled={levels.length <= 2}>
                    Delete Colour
                </button>
            </div>
        </div>
    )
}

export default ColourToggler;