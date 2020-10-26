import React from 'react';
import styled from 'styled-components';

import FrameBox from './FrameBox';
import GameBackground from 'Components/GameBackground';
import PausePopup from 'Components/PausePopup';
import DonePopup from 'Components/DonePopup';
import DailyPopup from 'Components/DailyPopup';
import CardComp from 'Components/Card';

const Div = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const PicBoxParent = styled.div`
    width: ${props => props.picSize};
    height: ${props => props.picSize};
    max-width: 300px;
    margin-top: 3%;
`;

const CardParent = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    margin-bottom: 2%;
    width: calc(100vw - 11%);
    height:75vh;
`;

const ConsoCommon = ({ props }) => {
    const [cardSize, textSize] = ['22vw', '6.5rem'];

    return (
        <Div>
            <PicBoxParent picSize={'40vw'}><FrameBox src={props.picBox} /></PicBoxParent>
            <CardParent>
                <CardComp
                    src={props.Card[0]}
                    alt='카드1'
                    textSize={textSize}
                    cardSize={cardSize}
                    text={props.CardTextList[0]}
                    onCardTouchHandle={props.onCardTouchHandle}
                    gameState={props.gameState}
                    index={0} />
                <CardComp
                    src={props.Card[1]}
                    alt='카드2' textSize={textSize}
                    cardSize={cardSize}
                    text={props.CardTextList[1]}
                    onCardTouchHandle={props.onCardTouchHandle}
                    gameState={props.gameState}
                    index={1} />
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
                <ConsoCommon props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
