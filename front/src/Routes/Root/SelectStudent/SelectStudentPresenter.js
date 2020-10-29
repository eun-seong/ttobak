import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SelectStudentComp from './SelectStudentComp';

function SelectStudent({ students, handler, goBack }) {
    return (
        <RootBackGround
            background={MainRoot.icon_background}
            title={'학습자 선택'}
            Content={() => SelectStudentComp({ students, handler })}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default SelectStudent;