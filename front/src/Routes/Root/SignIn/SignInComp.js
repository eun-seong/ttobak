import React from 'react';
import styled from 'styled-components';
import SubmitButton from 'Components/Button';
import { Link } from 'react-router-dom';

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
                <ForgotPassword>
                    <Link to='/root/forgotpassword'>비밀번호를 잊으셨나요?</Link>
                </ForgotPassword>
            </SignInBox>
            <Link to='/'>
                <SubmitButton onClick={handleSubmit} text={'확인'} />
            </Link>
            <Link to='/root/signup'><SignUpBt>회원 가입</SignUpBt></Link>
        </CompBox>
    );
}

export default SignInComp;