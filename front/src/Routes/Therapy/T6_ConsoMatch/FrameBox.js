import React from 'react';
import styled from 'styled-components';
import effectSound from 'tic.mp3';

import { T6 } from 'images';

const sound = new Audio(effectSound);

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

const FrameBox = ({ src, frameSize, index, onFrameTouchHandle, gameState }) => {
    return (
        <Box src={T6.t6_frame}
            frameSize={frameSize || '100%'}
            onTouchEnd={() => onFrameTouchHandle(index)}
            onTouchStart={() => { gameState && sound.play() }}>
            <Picture src={src || T6.t6_excpic} alt='그림' />
        </Box>
    );
}

export default FrameBox;