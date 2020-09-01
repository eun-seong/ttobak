import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AnswerBoxComp from './AnswerBox';

import Images from 'images';
import Background from 'img/d1_sweep/d1_background.png'

/* styled-components */
const BackgroundImg = styled.img`
    width: 100%;
    margin: auto auto;
    bottom:0;
`;

const PauseButton = styled.img`
    position : absolute;
    width:7%;
    margin: 10px;
`;

const ButtonImg = styled.img`
    width: 20%;
    top: 60%;
`;

const UpButtonImg = styled(ButtonImg)`
    width: 40%;
    margin: 0 15px 0 0;
`;

const DownButtonImg = styled(ButtonImg)`
    width:40%;
    margin: 0 0 0 15px;
`;

const Component = styled.div`
    width: 50%;
    position:absolute;
    justify-content: center;
    margin: 5px 0 0 0 ;
    right:15%;
    top: 1%;
`;

const ButtonComponent = styled.div`
    display: flex;
    justify-content:center;
    margin: 0 0 5px 0 ;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 20%;
    top: 17%;
    left: 3%;
`;

const Sweep = ({ onTouchStart, onTouchEnd, UpButton, DownButton, UP, DOWN, Answer, TTobak }) => {
    return (
        <div>
            <Link to='/'><PauseButton src={Images.bt_pause} alt='일시정지' /></Link>
            <TTobakComponent src={TTobak} alt='또박이' />
            <Component>
                <AnswerBoxComp Answer1={Answer[0]} Answer2={Answer[1]} />
                <ButtonComponent>
                    <UpButtonImg
                        src={UpButton}
                        alt='up'
                        onTouchStart={() => onTouchStart(UP)}
                        onTouchEnd={() => onTouchEnd(UP)} />
                    <DownButtonImg
                        src={DownButton}
                        alt='down'
                        onTouchStart={() => onTouchStart(DOWN)}
                        onTouchEnd={() => onTouchEnd(DOWN)} />
                </ButtonComponent>
            </Component>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Sweep;