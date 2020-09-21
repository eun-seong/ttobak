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

const UserInfo = ({ goBack }) => {
    return (
        <Container>
            <HeaderComp title={'회원 정보'} goBack={goBack} />
            User Information
        </Container>
    );
}

export default UserInfo;