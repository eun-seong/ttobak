import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { SoundEffect } from 'images';

const sound = new Audio(SoundEffect.touch_effect);

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    height: 35vh;
    width: 35vh;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    ${props => {
        if (props.isAnimate) {
            return css`
                animation: ${animate} 0.5s 0.3s 2 alternate;
                animation-timing-function:ease;
            `;
        }
    }}
`;

const animate = keyframes`
    from{
        bottom:0px;
    }
    to{
        top:10px;
    }
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    text-align:center;
    font-size: 4rem;
    font-weight: bold;
    width: 70%;
`;


const BoxComponent = ({ text, BoxImg, isAnimate, onBoxTouchHandle, index, gameState }) => {
    return (
        <Box
            src={BoxImg}
            isAnimate={isAnimate}
            onTouchEnd={() => onBoxTouchHandle(index)}
            onTouchStart={() => { gameState && sound.play() }}>
            <Text>{text || 'ㄱ'}</Text>
        </Box>
    );
}

export default BoxComponent;