import React from 'react';
import styled from 'styled-components';

const CardComponent = styled.div`
    display: flex;
    width:45%;
    height: auto;
    text-align: center;
`;

const TextComponent = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3.5rem;
    font-weight: bold;
    width: 45%;
    height: 50%;
`;

const ImgComponent = styled.img`
    width: 100%;
    height: auto;
    max-height: 90vh;
`;

const Card = ({ src }) => {
    return (
        <CardComponent>
            <TextComponent>고기</TextComponent>
            <ImgComponent src={src} alt='카드' />
        </CardComponent>
    );
}

export default Card;