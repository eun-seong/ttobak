import React from 'react';
import styled from 'styled-components';
import effectSound from 'tic.mp3';

const sound = new Audio(effectSound);

const CardComponent = styled.div`
    display: flex;
    width: ${props => props.cardSize || '30vw'};
    height: 100%;
    max-width: 50vw;
    text-align: center;
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
    return (
        <CardComponent cardSize={cardSize} onTouchEnd={() => onCardTouchHandle(index)} onTouchStart={() => { gameState && sound.play() }}>
            <ImgComponent src={src}>
                <TextComponent textSize={textSize}>{text || 'ㅅ'}</TextComponent>
            </ImgComponent>
        </CardComponent>
    );
}

export default Card;