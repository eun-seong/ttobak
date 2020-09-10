import React from 'react';
import styled from 'styled-components';
import SubmitButton from 'Components/Button';

const CompBox = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SignInBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InputBox = styled.input`
    width: 260px;
    height: 36px;
    border-radius: 10px;
    margin: 5px 0px;
    padding: 0px 15px;
    background-color: #ffffff;
    border-color: #ffffff;
    color: #464646;
`;

const ForgotPassword = styled.div`
    width: 100%;
    margin-top: 3px;
`;

const SignUpBt = styled.div`
    margin-top: 5px;
`;

function SignInComp({ handleSubmit, setId, setPassword }) {
    return (
        <CompBox>
            <SignInBox>
                <InputBox type='text' placeholder='이메일' />
                <InputBox type='password' placeholder='비밀번호' />
                <ForgotPassword>비밀번호를 잊으셨나요?</ForgotPassword>
            </SignInBox>
            <SubmitButton onClick={handleSubmit} text={'확인'} />
            <SignUpBt>회원 가입</SignUpBt>
        </CompBox>
    );
}

export default SignInComp;