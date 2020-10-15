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

const SelectLearning = ({ ContentsList, goBack, s_id }) => {
    document.body.style.overflow = 'visible';

    return (
        <Container>
            <HeaderComp title={'선택하기'} goBack={goBack} />
            {ContentsList.map((list) => {
                return (
                    <div key={list.index} >
                        <ContentBox>
                            <ContentComp
                                src={list.img}
                                flex={5}
                                title={list.title}
                                explain={list.explain}
                                url={list.url + `/${s_id}/F`} />
                        </ContentBox>
                        <Line />
                    </div>
                );
            })}
        </Container>
    );
}

export default SelectLearning;