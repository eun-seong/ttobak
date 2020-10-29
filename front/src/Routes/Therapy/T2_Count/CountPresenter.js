import React from 'react';
import styled from 'styled-components';

import GameBackground from 'Components/GameBackground';
import PausePopup from 'Components/PausePopup';
import DonePopup from 'Components/DonePopup';
import DailyPopup from 'Components/DailyPopup';
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

const Complete = styled.img`
    position: absolute;
    width:9%;
    bottom: 10px;
    left: 10px;
`;

const Counting = ({ props }) => {
    return (
        <Div>
            <Complete src={props.bt_complete} alt='complete' onTouchEnd={props.onCompleteButtonHandle} />
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
                <Counting props={props} />
            }>
        </GameBackground>
    );
}

export default Game;
