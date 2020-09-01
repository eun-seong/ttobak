import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AnswerComp from './AnswerComp';

import Images from 'images';
import Background from 'img/d2_recognition/d2_background.png'

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

const TTobakComponent = styled.img`
    position:absolute;
    width: 16%;
    top: 3%;
    right: 43%;
`;

const Recognition = ({ TTobaki, Box, Clicked }) => {
    return (
        <div>
            <Link to=''><PauseButton src={Images.bt_pause} alt='일시정지' /></Link>
            <TTobakComponent src={TTobaki} alt='또박이' onTouchStart={() => Clicked('ttt')} />
            <AnswerComp Box={Box} Clicked={Clicked} />
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Recognition;