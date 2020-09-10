import React from 'react';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SignUpComp from './SignUpComp';

function SignUp({ handleSubmit, setId, setPassword }) {
    return (
        <RootBackGround
            background={MainRoot.root_background}
            title={'또박이 회원 가입'}
            Content={SignUpComp}>
        </RootBackGround>
    );
}

export default SignUp;