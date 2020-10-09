import React from 'react';
import styled from 'styled-components';

import BackButton from 'Components/BackButton';

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
    padding: 3%;
    background-color: rgba(255,255,255,0.8);
    border-radius: 40px 90px / 80px 40px;
    z-index: 0;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 2%;
`;

const Title = styled.div`
    font-family: 'paybooc-Bold';
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
    color: #464646;
    z-index: 1;
`;

const SubTitle = styled.div`
    width: 100%;
    padding-top: 3px;
    text-align: center;
    font-size: 0.45rem;
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

function RootBackGround({ background, title, Content, subTitle, goBack }) {
    // let tempSubTitle = null;
    // if (subTitle !== undefined) tempSubTitle = <SubTitle>{subTitle}</SubTitle>
    // let BackButton = <PauseButton link={'/'} back={true} />;
    // if (signin) BackButton = null;

    console.log(!goBack || 'true');
    console.log(goBack);
    return (
        <Component>
            {/* TODO 이전으로 */}
            {!goBack || <BackButton link={'/'} goBack={goBack} />}
            <Box>
                <Header>
                    <Title>{title}</Title>
                    {subTitle && <SubTitle>{subTitle}</SubTitle>}
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