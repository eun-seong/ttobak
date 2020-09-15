import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SignInComp from './SignInComp';

function SignIn({ handleSubmit, setId, setPassword }) {
    return (
        <RootBackGround
            background={MainRoot.root_background}
            title={'또박이 로그인'}
            Content={SignInComp}
            signin={true}>
        </RootBackGround>
    );
}

export default SignIn;