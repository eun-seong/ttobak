import React from 'react';
import styled from 'styled-components';

import { colors } from 'const';

const Div = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    top: 3vh;
    right: 3vh;
    background-color: ${colors.background};
    border-radius: 100px;
    border: 1px solid grey;
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    text-align: center;
    font-weight: bold;
`;

const GameStatus = ({ currentIndex, totalNum }) => {
    return (
        <Div>
            <Text>{currentIndex || 0}/{totalNum || 0}</Text>
        </Div>
    );
}

export default GameStatus;