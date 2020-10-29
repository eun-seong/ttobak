import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SelectIconComp from './SelectIconComp';

function SelectIcon({ student, goBack }) {
    return (
        <RootBackGround
            background={MainRoot.icon_background}
            title={'아이콘 선택'}
            Content={() => SelectIconComp({student})}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default SelectIcon;