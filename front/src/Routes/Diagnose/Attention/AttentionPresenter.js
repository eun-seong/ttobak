import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import NextPopup from 'Components/NextPopup';
import PausePopup from 'Components/PausePopup';
import { D3, TTobak } from 'images';

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
    background-color: ${props => props.RecordingCircle ? '#fe4a2f' : '#a8aaa9'};
    top: 15vh;
    right: 20px;
`;

const CompleteButton = styled.img`
    position: absolute;
    width: 9%;
    top: 10px;
    left: 10vw;
`;

const Bubble = styled.img`
    position:absolute;
    width: 5%;
    top: 40%;
    left: 37%;
    display: ${props => props.isPlaying ? 'block' : 'none'};
`;

const Attention = ({ props }) => {
    return (
        <Div>
            <Bubble src={TTobak.speech_bubble} alt='bubble' isPlaying={props.isPlaying} />
            <CompleteButton src={D3.bt_complete} alt='complete' onTouchEnd={props.onCompleteButtonHandle} />
            <RecordingCircle RecordingCircle={props.RecordingCircle}></RecordingCircle>
            <TTobakComponent src={props.TTobak} alt='또박이' />
            {
                props.showPopup ?
                    <PausePopup
                        onContinueButtonHandle={props.onContinueButtonHandle}
                        text={'그만 하기를 누르면 검사 진행 상황이 초기화됩니다.'}
                        size={'1rem'} />
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
        <GameBackground
            BackgroundImg={Background}
            onPauseButtonHandle={props.onPauseButtonHandle}
            currentIndex={props.currentIndex}
            totalNum={props.totalNum}
            Children={
                <Attention props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
