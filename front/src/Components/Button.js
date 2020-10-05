import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonDiv = styled.button`
    border-radius: 26px;
    border: 0px solid;
    margin-top: 10px;
    padding: 0 10px;
    background-color:#AC9BC9;
    color: #ffffff;
`;

const Text = styled.div`
    font-size: 1.1rem;
    font-family: 'paybooc-Medium';
    padding: 10px 30px;
`;

function Button({ text, onClick, to }) {
    return (
        <Link to={to}>
            <ButtonDiv onTouchEnd={onClick}>
                <Text>{text}</Text>
            </ButtonDiv>
        </Link>
    );
}

export default Button;