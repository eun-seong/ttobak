import React from 'react';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SignUpComp from './SignUpComp';

function SignUp({ handleSubmit, setId, setPassword, goBack }) {
    return (
        <RootBackGround
            background={MainRoot.root_background}
            title={'또박이 회원 가입'}
            Content={SignUpComp}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default SignUp;