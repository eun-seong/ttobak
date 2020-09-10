import React from 'react';
import styled from 'styled-components';

const InputComp = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    align-items: center;
`;

const Text = styled.div`
    font-size: 1.2rem;
    padding-right: 20px;
`;

const InputBox = styled.input`
    border-color: #ffffff00;
    border-bottom-color: #d2d2d2;
    height: 25px;
    width: 60%;
    /* opacity: 0%; */
`;

function InputBoxComp({ text }) {
    return (
        <InputComp>
            <Text>{text}</Text>
            <InputBox type='text' />
        </InputComp>
    );
}

export default InputBoxComp;