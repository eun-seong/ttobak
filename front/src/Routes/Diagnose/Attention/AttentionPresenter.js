import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';

const Attention = ({ props }) => {
    return (
        <div>
            Attention
        </div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <Attention props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
