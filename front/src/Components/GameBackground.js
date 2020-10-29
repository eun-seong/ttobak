import React from 'react';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';
import GameStatus from 'Components/GameStatus';

const BackgroundDiv = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    font-family:'NanumBarunGothic';
    font-weight: 400;
`;

const GameBackground = ({ BackgroundImg, Children, onPauseButtonHandle, currentIndex, totalNum }) => {
    return (
        <BackgroundDiv src={BackgroundImg}>
            {Children}
            <PauseButton onPauseButtonHandle={onPauseButtonHandle} />
            <GameStatus currentIndex={currentIndex} totalNum={totalNum} />
        </BackgroundDiv>
    );
}

export default GameBackground;