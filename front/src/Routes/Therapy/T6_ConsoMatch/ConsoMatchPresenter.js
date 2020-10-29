import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import PausePopup from 'Components/PausePopup';
import DonePopup from 'Components/DonePopup';
import DailyPopup from 'Components/DailyPopup';
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
                        <FrameBox
                            key={index}
                            src={list}
                            frameSize={frameSize}
                            onFrameTouchHandle={props.onFrameTouchHandle}
                            index={index}
                            gameState={props.gameState}
                        />
                    );
                })}
            </Frames>
            <WormComponent src={props.Worm} alt='worm' onTouchEnd={props.onWormTouchHandle} />
            {
                props.showPopup ?
                    <PausePopup
                        onContinueButtonHandle={props.onContinueButtonHandle} />
                    : null
            }
            {
                props.showDonePopup ?
                    <DonePopup
                        onRestartButtonHandle={props.onRestartButtonHandle} />
                    : null
            }
            {
                props.showDailyPopup ?
                    <DailyPopup />
                    : null
            }
        </Div>
    );
}

const Game = ({ Background, onPauseButtonHandle, ...props }) => {
    return (

        <GameBackground
            BackgroundImg={Background}
            onPauseButtonHandle={onPauseButtonHandle}
            currentIndex={props.currentIndex}
            totalNum={props.totalNum}
            Children={
                <ConsoMatch props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
