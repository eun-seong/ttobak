import React from 'react';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';

/* styled-components */
const Img = styled.img`
    width: 100%;
`;

const BackgroundImg = styled(Img)`
    margin: auto auto;
    bottom:0;
`;

const Attention = ({ Background }) => {
    return (
        <div>
            <PauseButton link={'/'} />
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Attention;