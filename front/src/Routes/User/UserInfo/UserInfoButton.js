import React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.button`
    border-radius: 26px;
    border: 1px solid;
    margin-top: 10px;
    padding: 0 10px;
    background-color:#ffffff;
    border-color: #000000;
    color: #000000;
`;

const Text = styled.div`
    font-size: 1.1rem;
    font-family: 'paybooc-Medium';
    padding: 3px 20px;
`;

function Button({ text, onClick }) {
    return (
        <ButtonDiv onTouchEnd={onClick}>
            <Text>{text}</Text>
        </ButtonDiv>
    );
}

export default Button;