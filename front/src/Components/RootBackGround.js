import React from 'react';
import styled from 'styled-components';

import BackButton from 'Components/BackButton';
import Alert from 'Components/Alert';

const Component = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
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

function RootBackGround({ background, title, Content, subTitle, goBack, showPopup, onButtonTouchEnd, text }) {
    console.log(goBack);

    return (
        <Component src={background}>
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
            {
                showPopup ?
                    <Alert text={text} onButtonTouchEnd={onButtonTouchEnd} /> :
                    null
            }
        </Component>
    );
}

export default RootBackGround;