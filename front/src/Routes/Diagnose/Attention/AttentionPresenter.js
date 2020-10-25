import React from 'react';

import GameBackground from 'Components/GameBackground';
import NextPopup from 'Components/NextPopup';
import PausePopup from 'Components/PausePopup';

const Attention = ({ props }) => {
    return (
        <div>
            Attention
            {
                props.showPopup ?
                    <PausePopup
                        onContinueButtonHandle={props.onContinueButtonHandle} />
                    : null
            }
            {
                props.showNextPopup ?
                    <NextPopup
                        onPopupButtonHandle={props.onPopupButtonHandle}
                        buttonText={'다음 검사'} />
                    : null
            }
        </div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background} onPauseButtonHandle={props.onPauseButtonHandle}
            Children={
                <Attention props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
