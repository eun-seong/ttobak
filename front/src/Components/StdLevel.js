import React from 'react';
import styled from 'styled-components';

const Level = styled.div`
    display: flex;
    width: 67px;
    height: 35px;
    text-align: center;
    justify-content: center;
    align-items:center;
    font-size: 1.1rem;
    border-radius: 10px;
    border: 0px solid;
    background-color:${props => props.color || '#8BAB8D'} ;
    color: #ffffff;
`;

function StdLevel({ text, color }) {
    return (
        <Level color={color}>{text}</Level>
    );
}

export default StdLevel;