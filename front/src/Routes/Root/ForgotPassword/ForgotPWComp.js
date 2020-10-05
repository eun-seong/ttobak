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

const ForgotBox = styled.div`
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

function SignInComp({ handleSubmit }) {
    return (
        <CompBox>
            <ForgotBox>
                <InputBox type='text' placeholder='이메일' />
            </ForgotBox>
            <SubmitButton onClick={handleSubmit} text={'확인'} to='/root/signin' />
        </CompBox>
    );
}

export default SignInComp;