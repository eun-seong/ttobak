import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import Apple from './Apple';

const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100vw;
    height: 100vh;
`;

const TreeDiv = styled.div`
    position: absolute;
    /* background-color: skyblue; */
    width: 20vw;
    height: 30vw;
    left: 0;
`;

const Basket = styled.div`
    display: flex;
    justify-content: center;
    width: 70%;
    height: auto;
`;

const BasketImg = styled.img`
    position: absolute;
    height: 50%;
    bottom: 2.5%;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 18%;
    top: 6%;
    right: 20%;
`;

const Counting = ({ props }) => {
    return (
        <Div>
            <Apple isTreeDragging={props.isDragging} touchPosition={props.touchPosition} clientHeight={props.clientHeight} />
            <TreeDiv onTouchStart={props.onTreeTouchStartHandle} onTouchEnd={props.onTreeTouchEndHandle}></TreeDiv>
            <TTobakComponent src={props.TTobak} alt='또박이' onClick={() => alert('ttobaki')} />
            <Basket>
                <BasketImg src={props.Basket} alt='바구니' />
            </Basket>
        </Div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <Counting props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
