import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { SoundEffect } from 'images';

const sound = new Audio(SoundEffect.touch_effect);

const CardComponent = styled.div`
    display: flex;
    width: ${props => props.cardSize || '30vw'};
    height: 100%;
    max-width: 50vw;
    text-align: center;
    ${props => {
        if (props.isTouched) {
            return css`filter: drop-shadow(0px 0px 2px #666666);`
        }

        if (!props.isTouched) {
            return css`filter: drop-shadow(0px 0px 4px #666666);`
        }
    }}
`;

const ImgComponent = styled.div`
    display: flex;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: 100% auto;
    width: 100%;
    height: 100%;
    justify-content:center;
    z-index: 1;
`;

const TextComponent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
    font-size: ${props => props.textSize || '1rem'};
    font-weight: bold;
    width: 80%;
    height: 50%;
    z-index: 2;
`;

const Card = ({ src, text, textSize, cardSize, index, onCardTouchHandle, gameState }) => {
    const [isTouched, setTouched] = useState(false);

    return (
        <CardComponent
            cardSize={cardSize}
            onTouchEnd={() => {
                if (gameState) {
                    setTouched(false);
                    onCardTouchHandle(index);
                }
            }}
            onTouchStart={() => {
                if (gameState) {
                    setTouched(true);
                    sound.play();
                }
            }}
            isTouched={isTouched}>
            <ImgComponent src={src}>
                <TextComponent textSize={textSize}>{text || 'ㅅ'}</TextComponent>
            </ImgComponent>
        </CardComponent>
    );
}

export default Card;