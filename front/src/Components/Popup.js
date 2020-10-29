import React from 'react';

import PausePopup from 'Components/PausePopup';
import DonePopup from 'Components/DonePopup';
import DailyPopup from 'Components/DailyPopup';

const Popup = ({ onContinueButtonHandle, onRestartButtonHandle }) => {
    return (
        <div>
            {
                props.showPopup ?
                    <PausePopup
                        onContinueButtonHandle={onContinueButtonHandle} />
                    : null
            }
            {
                props.showDonePopup ?
                    <DonePopup
                        onRestartButtonHandle={onRestartButtonHandle} />
                    : null
            }
            {
                props.showDailyPopup ?
                    <DailyPopup />
                    : null
            }
        </div>
    );
}

export default Popup;