import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import Apple from './Apple';
import Basket from './Basket';

const Div = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100vw;
    height: 100vh;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 18%;
    top: 6%;
    right: 20%;
    z-index: 0;
`;

const Counting = ({ props }) => {
    return (
        <Div>
            <Apple
                isTreeDragging={props.isDragging}
                touchPosition={props.touchPosition}
                onTreeTouchStartHandle={props.onTreeTouchStartHandle}
                onTreeTouchEndHandle={props.onTreeTouchEndHandle}
                createRandomApple={props.createRandomApple}
            />
            <TTobakComponent src={props.TTobak} alt='또박이' onClick={props.TTobakiTouch} />
            <Basket
                src={props.Basket}
                Apple={props.Apple}
                dropApple={props.dropApple}
            />
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
