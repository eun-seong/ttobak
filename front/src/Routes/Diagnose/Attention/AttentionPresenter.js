import React from 'react';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';

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

const Attention = () => {
    return (
        <div>
            <PauseButton link={'/'} />
            {/* <BackgroundImg src={Background} alt='배경화면' /> */}
        </div>
    );
}

export default Attention;