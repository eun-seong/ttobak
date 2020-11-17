import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SubmitButton from 'Components/Button';

const CompBox = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SignUpBox = styled.div`
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

let state = {
    name: '',
    email: '', 
    pw: '', 
    pw_check: ''
};

const setName = (e) => {
    state['name'] = e.target.value;
}

const setEmail = (e) => {
    state['email'] = e.target.value;
}

const setPw = (e) => {
    state['pw'] = e.target.value;
}

const setPwCheck = (e) => {
    state['pw_check'] = e.target.value;
}


function SignUpComp({ handleSubmit }) {
    return (
        <CompBox>
            <SignUpBox>
                <InputBox type='text' placeholder='닉네임' onChange={setName} />
                <InputBox type='text' placeholder='이메일' onChange={setEmail} />
                <InputBox type='password' placeholder='비밀번호' onChange={setPw} />
                <InputBox type='password' placeholder='비밀번호 확인' onChange={setPwCheck} />
            </SignUpBox>
            <SubmitButton onClick={(e) => {handleSubmit(e, state);}} text={'회원 가입'} to='/root/addstd/1' />
        </CompBox>
    );
}

export default SignUpComp;