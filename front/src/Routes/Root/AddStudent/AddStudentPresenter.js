import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import AddStudentComp from './AddStudentComp';

function AddStudent({ handleSubmit, setId, setPassword }) {
    return (
        <RootBackGround
            background={MainRoot.root_background}
            title={'학습자 추가'}
            subTitle={'학습자 등록을 완료하면 검사를 시작합니다'}
            Content={AddStudentComp}>
        </RootBackGround>
    );
}

export default AddStudent;