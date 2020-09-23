import React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.button`
    width: 95px;
    height: 34px;
    font-size: 0.9rem;
    font-family: 'paybooc-Medium';
    border-radius: 26px;
    border: 0px solid;
    margin-top: 10px;
    background-color:#AC9BC9;
    color: #ffffff;
`;

function Button({ text, onClick }) {
    return (
        <ButtonDiv onTouchEnd={onClick}>{text}</ButtonDiv>
    );
}

export default Button;