import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';
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

const VowelWord = () => {
    return (
        <div>
            <PauseButton link={'/'} />
            VowelWord
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default VowelWord;