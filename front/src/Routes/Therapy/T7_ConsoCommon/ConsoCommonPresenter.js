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

const ConsoCommon = ({ Card }) => {
    const [cardSize, textSize] = ['22vw', '6.5rem'];

    return (
        <Div>
            <PicBoxParent picSize={'40vw'}><FrameBox /></PicBoxParent>
            <CardParent>
                <CardComp src={Card[0]} alt='카드1' textSize={textSize} cardSize={cardSize} />
                <CardComp src={Card[1]} alt='카드2' textSize={textSize} cardSize={cardSize} />
            </CardParent>
        </Div>
    );
}

const Game = ({ Background, Card }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <ConsoCommon Card={Card} />
            }>
        </GameBackground>
    );
}

export default Game;
