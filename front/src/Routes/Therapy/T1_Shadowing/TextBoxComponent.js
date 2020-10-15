import React from 'react';
import styled from 'styled-components';

const TextBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.3rem;
    height: 65%;
    width: 80%;
`;

const TextBoxComponent = ({ text, src, type }) => {
    return (
        <TextBox src={src}>
            <Text>{text || type || '친구들아 친구들아'}</Text>
        </TextBox>
    );
}

export default TextBoxComponent;