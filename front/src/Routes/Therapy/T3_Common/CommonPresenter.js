import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import PausePopup from 'Components/PausePopup';
import DonePopup from 'Components/DonePopup';
import DailyPopup from 'Components/DailyPopup';

import BoxComponent from './BoxComponent';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100vw;
    height: 100vh;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 16%;
    height: auto;
    top: 4%;
`;

const Boxes = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100vw;
    height: auto;
    margin-bottom: 7%;
`;

const Common = ({ props }) => {
    return (
        <Div>
            <TTobakComponent src={props.TTobak} alt='또박이' onTouchEnd={props.onTTobakiTouchHandle} />
            <Boxes>
                {props.boxTextList.map((list, index) => {
                    return (
                        <BoxComponent
                            key={index}
                            text={list}
                            index={index}
                            BoxImg={props.BoxImg}
                            isAnimate={props.isAnimate[index]}
                            onBoxTouchHandle={props.onBoxTouchHandle}
                            gameState={props.gameState} />
                    );
                })}
            </Boxes>
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
                <Common props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
