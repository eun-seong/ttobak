import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import PausePopup from 'Components/PausePopup';

import TextBoxComponent from './TextBoxComponent';

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

const Shadowing = ({ props }) => {
    return (
        <Div>
            <TTobakComponent src={props.TTobak} alt='또박이' />
            <TextBox>
                <TextBoxComponent src={props.TextBox} type={props.type} text={props.text} isRecording={props.isRecording} />
            </TextBox>
            {
                props.showPopup ?
                    <PausePopup
                        onContinueButtonHandle={props.onContinueButtonHandle} />
                    : null
            }
        </Div>
    );
}

const Game = ({ Background, onPauseButtonHandle, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background} onPauseButtonHandle={onPauseButtonHandle}
            Children={
                <Shadowing props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
