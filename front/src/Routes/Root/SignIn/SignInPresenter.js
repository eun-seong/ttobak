import React from 'react';
import styled from 'styled-components';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Header = styled.div`
    height: 67px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    color: #464646;
`;

const SignInBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const InputBox = styled.input`
    width: 260px;
    height: 36px;
    background-color: #ffffff;
    border-color: #ffffff;
    border-radius: 10px;
    margin: 5px 0px;
    padding: 0px 15px;
    color: #464646;
`;

const SubmitButton = styled.button`
    width: 100px;
    height: 37px;
    font-size: 18px;
    background-color:#AC9BC9;
    color: #ffffff;
    border-radius: 26px;
`;


function SignIn({ handleSubmit, setId, setPassword }) {
    return (
        <div>
            <Contents>
                <Header>
                    <Title>또박이 로그인</Title>
                </Header>
                <SignInBox>
                    <InputBox type='text' placeholder='이메일' />
                    <InputBox type='password' placeholder='비밀번호' />
                    <div>비밀번호를 잊으셨나요?</div>
                </SignInBox>
                <SubmitButton onTouchEnd={handleSubmit}>확인</SubmitButton>
            </Contents>
        </div>
    );
}

export default SignIn;