import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';


const BackgroundDiv = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    background-image: url(${MainRoot.root_background});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
`;

const Text = styled.div`
    justify-content: center;
    font-size: 3rem;
    font-weight: bold;
`;

const LoadingComp = () => {
    return (
        <BackgroundDiv >
            <Text>로딩 중...</Text>
        </BackgroundDiv>
    );
}
export default LoadingComp;