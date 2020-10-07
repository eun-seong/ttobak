import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import FrameBox from './FrameBox';

const Div = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const Frames = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items:flex-end;
    width: 80vw;
    height: ${props => props.frameSize};
`;

const WormComponent = styled.img`
    position:absolute;
    height: 60%;
    bottom: 7%;
    right: 5%;
`;

const ConsoMatch = ({ props }) => {
    const frameSize = '40vh';

    return (
        <Div>
            <Frames>
                {props.frameList.map((list, index) => {
                    return (
                        <FrameBox key={index} text={list} frameSize={frameSize} />
                    );
                })}
            </Frames>
            <WormComponent src={props.Worm} alt='또박이' onTouchEnd={props.WormTouch} />
        </Div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <ConsoMatch props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
