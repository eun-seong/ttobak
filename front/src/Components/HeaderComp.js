import React from 'react';
import styled from 'styled-components';
import BackButton from 'Components/BackButton';

const Header = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    position: sticky;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2em;
    font-family: 'paybooc-Bold';
    color: #464646;
    z-index: 1;
`;

const SubTitle = styled.div`
    width: 100%;
    padding-top: 3px;
    text-align: center;
    font-size: 0.5em;
    font-family: 'paybooc-Light';
    color: #464646;
    z-index: 1;
`;

function HeaderComp({ title, subTitle, goBack }) {
    return (
        <div>
            <Header>
                <Title>{title}</Title>
                {!!subTitle || <SubTitle>{subTitle}</SubTitle>}
            </Header>
            {!goBack || <BackButton goBack={goBack} />}
        </div>
    );
}

export default HeaderComp;