import React from 'react';
import styled from 'styled-components';

import Box from 'img/t3_phoneme/frame.png';
import ExcPic from 'img/t3_phoneme/excpic.png';

const PicBoxComponent = styled.div`
    display: flex;
    justify-content: center;
`;

const Picture = styled.img`
    position: absolute;
    width: 35%;
    top: 10%;
`;

const FrameBox = styled.img`
    width: 43%;
`;

const PicBox = ({ src }) => {
    return (
        <PicBoxComponent>
            <Picture src={ExcPic} alt='그림' />
            <FrameBox src={Box} alt='정답박스' />
        </PicBoxComponent>
    );
}

export default PicBox;