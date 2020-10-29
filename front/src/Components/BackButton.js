import React from 'react';
import styled from 'styled-components';
import Images, { imageURL } from 'images';

const BackButtonStyled = styled.img`
    position : absolute;
    width:7%;
    top: 10px;
    left: 10px;
`;

function BackButton({ goBack }) {
    return (
        <BackButtonStyled
            src={Images.bt_back}
            alt='뒤로가기'
            onClick={goBack} />
    );
}

export default BackButton;