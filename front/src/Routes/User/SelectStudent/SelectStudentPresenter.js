import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SelectStudentComp from './SelectStudentComp';

function SelectStudent({ students, goBack }) {
    return (
        <RootBackGround
            background={MainRoot.icon_background}
            title={'학습자 수정'}
            Content={() => SelectStudentComp({students})}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default SelectStudent;