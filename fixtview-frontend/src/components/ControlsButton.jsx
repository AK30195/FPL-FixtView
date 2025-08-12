
function ControlsButton({showControls, setShowControls}) {

    return (
        <button
            className="header-button"
            onClick={() => setShowControls(prev => !prev)}
            aria-expanded={showControls}
            aria-controls='controls'
        >
            {showControls ? 'Hide Controls' : 'Show Controls'}
        </button>
    )
};

export default ControlsButton;