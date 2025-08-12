
function ResetButton({ resetSettings }) {
    return (
        <button
            className="header-button"
            onClick={resetSettings}
        >
            Default Settings
        </button>
    )
}

export default ResetButton;