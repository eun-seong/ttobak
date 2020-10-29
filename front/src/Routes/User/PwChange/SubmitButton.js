import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonDiv = styled.button`
    border-radius: 26px;
    border: 0px solid;
    margin-top: 10px;
    padding: 0 10px;
    background-color: ${props => (props.isModify ? '#ff5500' : '#AC9BC9') };
    margin: 20px;
    color: #ffffff;
`;

const Text = styled.div`
    font-size: 1.1rem;
    font-family: 'paybooc-Medium';
    padding: 10px 30px;
`;

function SubmitButton({ isModify, text, onClick}) {
    return (
        <ButtonDiv isModify={isModify} onTouchEnd={onClick}>
            <Text>{text}</Text>
        </ButtonDiv>
    );
}

export default SubmitButton;