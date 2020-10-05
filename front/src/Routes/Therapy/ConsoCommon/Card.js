import React from 'react';
import styled from 'styled-components';

const CardComponent = styled.div`
    display: flex;
    width: 25%;
    text-align: center;
`;

const TextComponent = styled.p`
    font-size: 22vw;
    position: absolute;
`;

const ImgComponent = styled.img`
    width:100%;
`;

const Card = ({ src }) => {
    return (
        <CardComponent>
            <TextComponent>ㄱ</TextComponent>
            <ImgComponent src={src} alt='카드' />
        </CardComponent>
    );
}

export default Card;