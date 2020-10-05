import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';

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


const Phoneme = ({ Background }) => {
    return (
        <div>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Phoneme;