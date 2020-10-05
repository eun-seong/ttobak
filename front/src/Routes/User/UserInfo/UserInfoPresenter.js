import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComp from 'Components/HeaderComp';
import Button from 'Components/Button';
import InputBoxComp from './InputBoxComp';


/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    margin: 60px;
    flex: 1;
    justify-content: space-around;
    align-items: center;
`;

const TextButton = styled.div`
    display: flex;
    width: 150px;
    margin: 0 20px 20px 0;
    align-self: flex-end;
    justify-content: space-around;
`;

const Text = styled(Link)`
    font-size: 0.8rem;
`;

const UserInfo = ({ goBack }) => {
    return (
        <Container>
            <HeaderComp title={'회원 정보'} goBack={goBack} />
            <Contents>
                <InputBoxComp />
                <Button text={'비밀번호 변경'} to='/user/chpassword' />
            </Contents>
            <TextButton>
                <Text to=''>회원 탈퇴</Text>
                <Text to=''>로그아웃</Text>
            </TextButton>
        </Container>
    );
}

export default UserInfo;