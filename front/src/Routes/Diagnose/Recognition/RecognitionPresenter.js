import React from 'react';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';

import AnswerComp from './AnswerComp';

/* styled-components */
const Img = styled.img`
    width: 100%;
`;

const BackgroundImg = styled(Img)`
    margin: auto auto;
    bottom:0;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 16%;
    top: 3%;
    right: 43%;
`;

const Recognition = ({ TTobaki, Box, Clicked, TTobakiTouch, Background, isAnimate }) => {
    return (
        <div>
            <PauseButton link={'/'} />
            <TTobakComponent src={TTobaki} alt='또박이' onTouchEnd={TTobakiTouch} />
            <AnswerComp Box={Box} Clicked={Clicked} isAnimate={isAnimate} />
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Recognition;