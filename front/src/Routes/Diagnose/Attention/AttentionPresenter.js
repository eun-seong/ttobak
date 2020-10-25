import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import NextPopup from 'Components/NextPopup';
import PausePopup from 'Components/PausePopup';

const Div = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: flex-end;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 25%;
    bottom: 17%;
`;

const RecordingCircle = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: ${props => props.isRecording ? '#fe4a2f' : '#a8aaa9'};
    right: 20px;
    top: 20px;
`;

const Attention = ({ props }) => {
    return (
        <Div>
            <RecordingCircle isRecording={props.isRecording}></RecordingCircle>
            <TTobakComponent src={props.TTobak} alt='또박이' />
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
                        buttonText={'검사 완료'} />
                    : null
            }
        </Div>
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
