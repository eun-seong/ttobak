import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from './Card';

import Button_Pause from 'img/bt_pause.png';
import Background from 'img/t3_phoneme/t3_background.png'
import Card1 from 'img/t3_phoneme/card1.png'
import Card2 from 'img/t3_phoneme/card2.png'

/* styled-components */
const BackgroundImg = styled.img`
    width: 100%;
    margin: auto auto;
    bottom:0;
`;

const PauseButton = styled.img`
    width: 100%;
    position : absolute;
    width:7%;
    margin: 10px;
`;

const CardComponent = styled.div`
    justify-content:space-between;
    position: absolute;
`;


const Phoneme = () => {
    return (
        <div>
            <Link to=''><PauseButton src={Button_Pause} alt='일시정지' /></Link>
            <CardComponent>
                <Card src={Card1} alt='카드1' />
                <Card src={Card2} alt='카드2' />
            </CardComponent>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Phoneme;