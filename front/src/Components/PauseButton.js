import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Images from 'images';

const PauseButtonStyled = styled.img`
    position : absolute;
    width:7%;
    top: 10px;
    left: 10px;
`;

function PauseButton({ link }) {
    return (
        <Link to={link}>
            <PauseButtonStyled src={Images.bt_pause} alt='일시정지' />
        </Link>
    )
}

export default PauseButton;