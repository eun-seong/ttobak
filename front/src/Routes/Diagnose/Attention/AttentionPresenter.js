import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button_Pause from 'img/button/bt_pause.png';
// import Background from 'img/t3_phoneme/d1_background.png'
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

const Attention = () => {
    return (
        <div>
            <Link to=''><PauseButton src={Button_Pause} alt='일시정지' /></Link>
            {/* <BackgroundImg src={Background} alt='배경화면' /> */}
        </div>
    );
}

export default Attention;