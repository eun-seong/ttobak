import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderComp from 'Components/HeaderComp';
import ContentComp from 'Components/ContentComp';
import BackButton from 'Components/BackButton';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 7%;
    padding-top: 0%;
`;

const Line = styled.div`
    height: 2px;
    width: 100%;
    background-color: #DFD7C4;
`;

const SelectLearning = ({ ContentsList, goBack }) => {
    document.body.style.overflow = 'visible';
    console.log(goBack);

    return (
        <Container>
            <BackButton goBack={goBack} />
            <HeaderComp title={'선택하기'} />
            {ContentsList.map((list) => {
                return (
                    <div>
                        <ContentComp src={list.img} key={list.index} />
                        <Line />
                    </div>
                );
            })}
        </Container>
    );
}

export default SelectLearning;