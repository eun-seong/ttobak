import React from 'react';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import ForgotPWComp from './ForgotPWComp';

function ForgetPassword({ handleSubmit, setId, setPassword, goBack }) {
    return (
        <RootBackGround
            background={MainRoot.root_background}
            title={'비밀번호 찾기'}
            Content={ForgotPWComp}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default ForgetPassword;