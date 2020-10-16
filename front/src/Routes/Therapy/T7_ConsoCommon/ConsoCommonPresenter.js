import React from 'react';
import styled from 'styled-components';

import FrameBox from './FrameBox';
import GameBackground from 'Components/GameBackground';
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
                    index={0} />
                <CardComp
                    src={props.Card[1]}
                    alt='카드2' textSize={textSize}
                    cardSize={cardSize}
                    text={props.CardTextList[1]}
                    onCardTouchHandle={props.onCardTouchHandle}
                    index={1} />
            </CardParent>
        </Div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <ConsoCommon props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
