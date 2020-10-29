import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import PausePopup from 'Components/PausePopup';
import DonePopup from 'Components/DonePopup';
import DailyPopup from 'Components/DailyPopup';
import CardComp from 'Components/Card';

/* styled-components */
const Div = styled.div`
    display: flex;
    height: 100vh;
`;

const TTobakComponent = styled.img`
    position: absolute;
    width: 20%;
    height: auto;
    top: 18%;
    left: 4%;
`;

const CardParent = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 55vw;
    height:85vh;
    margin-right: 8%;
    bottom: 0; right: 0;
    margin-bottom: 2%;
`;

const Sound = ({ props }) => {
    const [cardSize, textSize] = ['24vw', '3.5rem'];

    return (
        <Div>
            <TTobakComponent src={props.TTobak} alt='또박이' onTouchEnd={props.TTobakiTouch} />
            <CardParent>
                <CardComp
                    src={props.Card[0]}
                    alt='카드1'
                    textSize={textSize}
                    cardSize={cardSize}
                    text={props.CardTextList[0]}
                    index={0}
                    onCardTouchHandle={props.onCardTouchHandle}
                    gameState={props.gameState} />
                <CardComp
                    src={props.Card[1]}
                    alt='카드2'
                    textSize={textSize}
                    cardSize={cardSize}
                    text={props.CardTextList[1]}
                    index={1}
                    onCardTouchHandle={props.onCardTouchHandle}
                    gameState={props.gameState} />
            </CardParent>
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
                <Sound props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
