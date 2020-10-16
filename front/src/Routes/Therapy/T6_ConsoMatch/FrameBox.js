import React from 'react';
import styled from 'styled-components';

import { T6 } from 'images';

const Box = styled.div`
    display: flex;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    width: ${props => props.frameSize};
    height: ${props => props.frameSize};
    justify-content:center;
    align-items: center;
`;

const Picture = styled.img`
    width: auto;
    height: 78%;
`;

const FrameBox = ({ src, frameSize, index, onBoxTouchHandle }) => {
    return (
        <Box src={T6.t6_frame} frameSize={frameSize || '100%'} onTouchEnd={() => onBoxTouchHandle(index)}>
            <Picture src={src || T6.t6_excpic} alt='그림' />
        </Box>
    );
}

export default FrameBox;