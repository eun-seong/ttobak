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

function HeaderComp({ title, subTitle, goBack }) {
    let tempSubTitle = null;
    if (subTitle !== undefined) tempSubTitle = <SubTitle>{subTitle}</SubTitle>

    return (
        <div>
            <Header>
                <Title>{title}</Title>
                {tempSubTitle}
            </Header>
            {(!!goBack) && <BackButton goBack={goBack} />}
        </div>
    );
}

export default HeaderComp;