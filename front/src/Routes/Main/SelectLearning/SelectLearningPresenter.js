import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderComp from 'Components/HeaderComp';
import ContentComp from 'Components/ContentComp';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 7%;
    padding-top: 0%;
`;

const ContentBox = styled.div`
    height: 100px;
`;

const Line = styled.div`
    height: 2px;
    width: 100%;
    background-color: #DFD7C4;
`;

const SelectLearning = ({ ContentsList, goBack }) => {
    document.body.style.overflow = 'visible';

    return (
        <Container>
            <HeaderComp title={'선택하기'} goBack={goBack} />
            {ContentsList.map((list) => {
                return (
                    <div>
                        <ContentBox>
                            <ContentComp src={list.img} key={list.index} flex={5} />
                        </ContentBox>
                        <Line />
                    </div>
                );
            })}
        </Container>
    );
}

export default SelectLearning;