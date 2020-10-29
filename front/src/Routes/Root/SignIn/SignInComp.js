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

const SignUpBt = styled(Link)`
    margin-top: 5px;
`;

let state = {
    email: '', 
    pw: '', 
};

const setEmail = (e) => {
    state['email'] = e.target.value;
}

const setPw = (e) => {
    state['pw'] = e.target.value;
}

function SignInComp({ handleSubmit}) {
    return (
        <CompBox>
            <SignInBox>
                <InputBox type='text' placeholder='이메일' onChange={setEmail}/>
                <InputBox type='password' placeholder='비밀번호' onChange={setPw}/>
                <ForgotPassword>
                    <Link to='/root/forgotpassword'>비밀번호를 잊으셨나요?</Link>
                </ForgotPassword>
            </SignInBox>
            <SubmitButton onClick={(e) => {handleSubmit(e, state);}} text={'확인'} to='/' />
            <SignUpBt to='/root/signup'>회원 가입</SignUpBt>
        </CompBox>
    );
}

export default SignInComp;