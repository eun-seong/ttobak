import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
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

const VowelSound = ({ props }) => {
    const [cardSize, textSize] = ['24vw', '3.5rem'];

    return (
        <Div>
            <TTobakComponent src={props.TTobak} alt='또박이' onTouchEnd={props.TTobakiTouch} />
            <CardParent>
                <CardComp src={props.Card[0]} alt='카드1' textSize={textSize} cardSize={cardSize} text={props.CardTextList[0]} />
                <CardComp src={props.Card[1]} alt='카드2' textSize={textSize} cardSize={cardSize} text={props.CardTextList[1]} />
            </CardParent>
        </Div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <VowelSound props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
