import React from 'react';
import styled from 'styled-components';
import Images from 'images';

const PauseButtonStyled = styled.img`
    position : absolute;
    width:7%;
    top: 10px;
    left: 10px;
`;

function PauseButton({ onPauseButtonHandle }) {
    return (
        <PauseButtonStyled src={Images.bt_pause} alt='일시정지' onTouchEnd={onPauseButtonHandle} />
    )
}

export default PauseButton;