import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Card from './Card';
import PicBox from './PicBox';

import PauseButton from 'Components/PauseButton';
import Background from 'img/t3_phoneme/t3_background.png'
import Card1 from 'img/t3_phoneme/card1.png'
import Card2 from 'img/t3_phoneme/card2.png'

/* styled-components */
const BackgroundImg = styled.img`
    width: 100%;
    margin: auto auto;
    bottom:0;
`;

const PicBoxParent = styled.div`
    position: absolute;
    height: 77.5%;
    display: flex;
    justify-content: center;
    top: 2.3%;
`;

const CardParent = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    padding: 0px 40px 0px 40px;
    height:75%;
`;


const Phoneme = () => {
    return (
        <div>
            <PicBoxParent><PicBox /></PicBoxParent>
            <CardParent>
                <Card src={Card1} alt='카드1' />
                <Card src={Card2} alt='카드2' />
            </CardParent>
            <PauseButton link={'/'} />
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Phoneme;