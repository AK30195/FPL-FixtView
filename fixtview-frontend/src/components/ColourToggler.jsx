import { HexColorPicker } from "react-colorful";
import { useState } from "react";

function ColourToggler({ diffColours, editColours }) {

    const [selectedDiff, setSelectedDiff] = useState(1)
    const initialColour = diffColours[selectedDiff].colour

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
                {Object.keys(diffColours).map((level) => (
                    <option key={level} value={level}>
                        {level}
                    </option>
                ))}
            </select>

            <HexColorPicker
                color={initialColour}
                onChange={(newColour) => editColours(Number(selectedDiff), newColour)}
            />
        </div>
    )
}

export default ColourToggler;