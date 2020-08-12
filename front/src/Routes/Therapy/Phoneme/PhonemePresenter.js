import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button_Pause from 'img/bt_pause.png';
import Background from 'img/t3_phoneme/t3_background.png'
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

const ButtonImg = styled(Img)`
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

const AnswerBoxImg = styled(Img)`
    width: 100%;
    margin: 5px 0 5px 0 ;
`;

const Component = styled.div`
    width: 50%;
    position:absolute;
    justify-content: center;
    right:15%;
`;

const ButtonComponent = styled.div`
    display: flex;
    justify-content:center;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 20%;
    top: 17%;
    left: 3%;
`;

const Phoneme = () => {
    return (
        <div>
            <Link to=''><PauseButton src={Button_Pause} alt='일시정지' /></Link>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Phoneme;