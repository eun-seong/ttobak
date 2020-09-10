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
    padding: 4%;
    background: #ffffff;
    opacity: 80%;
    border-radius: 40px 90px / 80px 40px;
    z-index: 0;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 2%;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2em;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #464646;
    z-index: 1;
`;

const SubTitle = styled.div`
    width: 100%;
    padding-top: 3px;
    text-align: center;
    font-size: 0.5em;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    color: #464646;
    z-index: 1;
`;

const Contents = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    /* background-color: grey; */
    z-index: 2;
`;

const BackgroundImg = styled.img`
    width: 100%;
    margin: auto auto;
    bottom:0;
`;

function RootBackGround({ background, title, Content, subTitle }) {
    let tempSubTitle = null;
    if (subTitle !== undefined) tempSubTitle = <SubTitle>{subTitle}</SubTitle>

    return (
        <Component>
            <Box>
                <Header>
                    <Title>{title}</Title>
                    {tempSubTitle}
                </Header>
                <Contents>
                    <Content />
                </Contents>
            </Box>
            <BackgroundImg src={background} alt='배경화면' />
        </Component>
    );
}

export default RootBackGround;