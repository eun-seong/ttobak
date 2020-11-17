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
    font-size: 1rem;
    padding-right: 20px;
`;

const InputBox = styled.input`
    border-color: #ffffff00;
    background-color: rgba(0,0,0,0);
    border-bottom-color: #d2d2d2;
    height: 25px;
    width: 60%;
    /* opacity: 0%; */
`;

function InputBoxComp({ text, defaultValue, placeholder, handler }) {
    return (
        <InputComp>
            <Text>{text}</Text>
            <InputBox type='text' defaultValue={defaultValue} placeholder={placeholder} onChange={handler} />
        </InputComp>
    );
}

export default InputBoxComp;