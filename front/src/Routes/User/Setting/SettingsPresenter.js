import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComp from 'Components/HeaderComp';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Settings = () => {
    return (
        <Container>
            <HeaderComp title={'마이 페이지'} />

        </Container>
    );
}

export default Settings;