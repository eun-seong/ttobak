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

const ButtonContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    width: 150px;
    height: 150px;
    border-radius: 15px;
    background-color: #FFFFFF;
    border: 2px solid #DFD7C4;
`;

const Settings = ({ goBack }) => {
    return (
        <Container>
            <HeaderComp title={'마이 페이지'} goBack={goBack} />
            <ButtonContainer>
                <Link to='/user/userinfo'><ButtonBox>회원 정보</ButtonBox></Link>
                <Link to='/user/stdstatistics'><ButtonBox>학습자 통계</ButtonBox></Link>
                <Link to='/user/selectstd'><ButtonBox>학습자 관리</ButtonBox></Link>
            </ButtonContainer>
        </Container>
    );
}

export default Settings;