import React from 'react';
import styled from 'styled-components';

const Level = styled.div`
    display: inline-block;
    justify-content: center;
    align-items:center;
    font-size: ${props => props.size || '1.1rem'} ;
    border-radius: 10px;
    border: 0px solid;
    background-color:${props => props.color || '#8BAB8D'} ;
    color: #ffffff;
`;

const Text = styled.div`
    display: inline-block;
    padding: 5px 7px;
    text-align: center;
`

function StdLevel({ text, color, fontSize }) {
    return (
        <Level color={color} size={fontSize}>
            <Text>{text}</Text>
        </Level>
    );
}

export default StdLevel;