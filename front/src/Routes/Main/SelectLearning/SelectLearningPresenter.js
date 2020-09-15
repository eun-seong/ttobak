import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderComp from 'Components/HeaderComp';
import PauseButton from 'Components/PauseButton';
import ContentComp from 'Components/ContentComp';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 7%;
    padding-top: 0%;
`;

const Main = ({ ContentsList }) => {
    document.body.style.overflow = 'visible';

    return (
        <Container>
            <PauseButton link={'/'} back={true} />
            <HeaderComp title={'선택하기'} />
            {ContentsList.map((list) => {
                return (
                    <ContentComp src={list.img} key={list.index} />
                );
            })}
        </Container>
    );
}


export default Main;