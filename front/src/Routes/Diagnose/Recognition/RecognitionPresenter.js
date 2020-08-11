import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button_Pause from 'img/bt_pause.png';
import Background from 'img/d2_recognition/d2_background.png'
import Box1 from 'img/d2_recognition/box1-1.png';
import Box2 from 'img/d2_recognition/box2-1.png';
import TTobak from 'img/ttobak/ttobak1-1.png';

/* styled-components */
const Img = styled.img`
    width: 100%;
`;

const BackgroundImg = styled(Img)`
    margin: auto auto;
    bottom:0;
`;

const PauseButton = styled(Img)`
    position : absolute;
    width:7%;
    margin: 10px;
`;

const BoxComponent = styled.div`
    position: absolute;
    display: flex;
    bottom: 10%;
    justify-content:center;
`;

const BoxImg = styled.img`
    width: 20%;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 16%;
    top: 3%;
    right: 43%;
`;

const Recognition = () => {
    return (
        <div>
            <Link to=''><PauseButton src={Button_Pause} alt='일시정지' /></Link>
            <TTobakComponent src={TTobak} alt='또박이' />
            <BoxComponent>
                <BoxImg src={Box1} alt='box1' />
                <BoxImg src={Box2} alt='box2' />
            </BoxComponent>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Recognition;