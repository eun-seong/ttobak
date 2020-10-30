import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import NextPopup from 'Components/NextPopup';
import PausePopup from 'Components/PausePopup';

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
        </div>
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
                <Recognition props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
