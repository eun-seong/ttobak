import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import PausePopup from 'Components/PausePopup';
import DonePopup from 'Components/DonePopup';
import DailyPopup from 'Components/DailyPopup';

import TextBoxComponent from './TextBoxComponent';
import { T1, TTobak } from 'images';

const Div = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: flex-end;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 15%;
    top: 10%;
`;

const TextBox = styled.div`
    width: 100%;
    height: 30vh;
    margin-bottom: 5%;
`;

const CompleteButton = styled.img`
    position: absolute;
    width: 9%;
    top: 15vh;
    right: 10px;
`;

const Shadowing = ({ props }) => {
    return (
        <Div>
            <CompleteButton src={T1.bt_complete} alt='complete' onTouchEnd={props.onCompleteButtonHandle} />
            <TTobakComponent src={props.TTobak} alt='또박이' />
            <TextBox>
                <TextBoxComponent src={props.TextBox} text={props.text} isRecording={props.RecordingCircle} />
            </TextBox>
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
                <Shadowing props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
