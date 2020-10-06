import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';
import Background from 'img/t1_shadowing/t1_background.png'

/* styled-components */
const Img = styled.img`
    width: 100%;
`;

const Component = styled.div`
    position: absolute;
`;

const BackgroundImg = styled(Img)`
    margin: auto auto;
    bottom:0;
`;

const VowelWord = ({ text }) => {
    return (
        <div>
            <PauseButton link={'/'} />
            <Component>
                {text}
            </Component>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default VowelWord;