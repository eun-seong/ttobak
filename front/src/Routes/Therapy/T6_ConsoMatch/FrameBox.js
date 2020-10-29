import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { SoundEffect } from 'images';

import { T6 } from 'images';

const sound = new Audio(SoundEffect.touch_effect);

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
    ${props => {
        if (props.isTouched) {
            return css`filter: drop-shadow(0px 0px 2px #666666);`
        }

        if (!props.isTouched) {
            return css`filter: drop-shadow(0px 0px 4px #666666);`
        }
    }}
`;

const Picture = styled.img`
    width: auto;
    height: 78%;
`;

const FrameBox = ({ src, frameSize, index, onFrameTouchHandle, gameState }) => {
    const [isTouched, setTouched] = useState(false);

    return (
        <Box src={T6.t6_frame}
            frameSize={frameSize || '100%'}
            onTouchEnd={() => {
                if (gameState) {
                    setTouched(false);
                    onFrameTouchHandle(index);
                }
            }}
            onTouchStart={() => {
                if (gameState) {
                    setTouched(true);
                    sound.play();
                }
            }}
            isTouched={isTouched}>
            <Picture src={src || T6.t6_excpic} alt='그림' />
        </Box>
    );
}

export default FrameBox;