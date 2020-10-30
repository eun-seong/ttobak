import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import NextPopup from 'Components/NextPopup';
import PausePopup from 'Components/PausePopup';

import AnswerBoxComp from './AnswerBox';

/* styled-components */
const Div = styled.div`
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    height: 100vh;
`;

const ButtonImg = styled.img`
    width: 20%;
    top: 60%;
`;

const UpButtonImg = styled(ButtonImg)`
    height: 100%;
    width: auto;
    margin-right: 15px;
`;

const DownButtonImg = styled(ButtonImg)`
    height: 100%;
    width: auto;
    margin-left: 15px;
`;

const Component = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90%;
    width: 68%;
`;

const ButtonComponent = styled.div`
    display: flex;
    justify-content:center;
    height: 35%;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 20%;
    top: 18%;
    left: 4%;
`;

const Sweep = ({ props }) => {
    return (
        <Div>
            <TTobakComponent src={props.TTobak} alt='또박이' onTouchEnd={props.TTobakiTouch} />
            <Component>
                <AnswerBoxComp Answer1={props.Answer[0]} Answer2={props.Answer[1]} AnswerBox={props.AnswerBox} />
                <ButtonComponent>
                    <UpButtonImg
                        src={props.UpButton}
                        alt='up'
                        onTouchStart={() => props.onTouchStart(props.UP)}
                        onTouchEnd={() => props.onTouchEnd(props.UP)} />
                    <DownButtonImg
                        src={props.DownButton}
                        alt='down'
                        onTouchStart={() => props.onTouchStart(props.DOWN)}
                        onTouchEnd={() => props.onTouchEnd(props.DOWN)} />
                </ButtonComponent>
            </Component>
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
                        buttonText={'다음 검사'} />
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
                <Sweep props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
