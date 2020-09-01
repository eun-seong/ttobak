import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button_Pause from 'img/button/bt_pause.png';
import Background from 'img/t1_shadowing/t1_background.png'
import TextBox from 'img/t1_shadowing/textbox.png'
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
const TTobakComponent = styled.img`
    position:absolute;
    width: 17%;
    top: 6%;
    left: 39%;
`;

const Component = styled.div`
    position:absolute;
    display: flex;
    justify-content:center;
    bottom: 18%;
    height: 31%;
    width:100%;
`;

const TextBoxImg = styled.img`
    height : 100%;
`;

const Shadowing = () => {
    return (
        <div>
            <Link to='/'><PauseButton src={Button_Pause} alt='일시정지' /></Link>
            <TTobakComponent src={TTobak} alt='또박이' />
            <Component>
                <TextBoxImg src={TextBox} alt='textbox' />
            </Component>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Shadowing;