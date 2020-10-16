import React from 'react';
import styled from 'styled-components';

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
`;

const Card = ({ src, text, textSize, cardSize, index, onCardTouchHandle }) => {
    return (
        <CardComponent cardSize={cardSize} onTouchEnd={() => onCardTouchHandle(index)}>
            <ImgComponent src={src}>
                <TextComponent textSize={textSize}>{text || 'ㅅ'}</TextComponent>
            </ImgComponent>
        </CardComponent>
    );
}

export default Card;