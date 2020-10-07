import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    height: 35vh;
    width: 35vh;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    text-align:center;
    font-size: 6rem;
    font-weight: bold;
    width: 70%;
`;


const BoxComponent = ({ text, BoxImg }) => {
    return (
        <Box src={BoxImg}>
            <Text>{text || 'ㄱ'}</Text>
        </Box>
    );
}

export default BoxComponent;