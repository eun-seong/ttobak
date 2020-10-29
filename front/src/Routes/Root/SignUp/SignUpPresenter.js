import React from 'react';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SignUpComp from './SignUpComp';

function SignUp({ handleSubmit, goBack }) {
    return (
        <RootBackGround
            background={MainRoot.root_background}
            title={'또박이 회원 가입'}
            Content={() => {
                return (
                    <SignUpComp
                        handleSubmit={handleSubmit}
                    />
                );
            }}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default SignUp;