
import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: calc(100% - 90px);
    height: calc(100% - 90px);
    padding: 0% 4% 4% 4%;
    background: #ffffff;
    opacity: 80%;
    border-radius: 40px 90px / 80px 40px;
    z-index: 0;
`;

const Title = styled.div`
    width: 100%;
    margin: 4% 0%;
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #464646;
    z-index: 1;
`;

const Contents = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: grey; */
    z-index: 2;
`;

const BackgroundImg = styled.img`
    width: 100%;
    margin: auto auto;
    bottom:0;
`;

function RootBackGround({ background, title, Content }) {
    return (
        <Component>
            <Box>
                <Title>{title}</Title>
                <Contents>
                    <Content />
                </Contents>
            </Box>
            <BackgroundImg src={background} alt='배경화면' />
        </Component>
    );
}

export default RootBackGround;