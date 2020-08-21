import React from 'react';
import styled from 'styled-components';

const ImgComponent = styled.img`
    width:20%;
`;

const TextComponent = styled.div`
    font-size: 20px;
    position: absolute;
`;

const Card = ({ src }) => {
    return (
        <div>
            <TextComponent>ㄱ</TextComponent>
            <ImgComponent src={src} alt='카드' />
        </div>
    );
}

export default Card;