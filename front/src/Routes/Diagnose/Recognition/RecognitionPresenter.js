import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';

import AnswerComp from './AnswerComp';

const TTobakComponent = styled.img`
    position:absolute;
    width: 16%;
    top: 3%;
    right: 43%;
`;

const Recognition = ({ props }) => {
    return (
        <div>
            <TTobakComponent src={props.TTobaki} alt='또박이' onTouchEnd={props.TTobakiTouch} />
            <AnswerComp Box={props.Box} Clicked={props.Clicked} isAnimate={props.isAnimate} />
        </div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <Recognition props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
