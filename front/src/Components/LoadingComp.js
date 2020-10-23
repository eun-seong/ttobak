import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import { Progress } from 'semantic-ui-react'

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

const ProgressDiv = styled.div`
    width: 500px;
    font-size: 1rem;
`;

const LoadingComp = ({ percent }) => {
    return (
        <BackgroundDiv >
            <ProgressDiv>
                <Progress percent={percent} success={percent === 100} indicating>
                    {percent === 100 ? '로딩 완료' : '로딩 중...'}
                </Progress>
            </ProgressDiv>
        </BackgroundDiv>
    );
}
export default LoadingComp;