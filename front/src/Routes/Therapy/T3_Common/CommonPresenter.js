import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import BoxComponent from './BoxComponent';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100vw;
    height: 100vh;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 16%;
    height: auto;
    top: 4%;
`;

const Boxes = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100vw;
    height: auto;
    margin-bottom: 7%;
`;

const Common = ({ props }) => {
    return (
        <Div>
            <TTobakComponent src={props.TTobak} alt='또박이' onTouchEnd={props.TTobakiTouch} />
            <Boxes>
                {props.boxList.map((list, index) => {
                    return (
                        <BoxComponent key={index} text={list} BoxImg={props.BoxImg} />
                    );
                })}
            </Boxes>
        </Div>
    );
}

const Game = ({ Background, ...props }) => {
    return (
        <GameBackground BackgroundImg={Background}
            Children={
                <Common props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
