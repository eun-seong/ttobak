import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import SelectIconComp from './SelectIconComp';

function SelectIcon({ goBack }) {
    return (
        <RootBackGround
            background={MainRoot.icon_background}
            title={'아이콘 선택'}
            Content={SelectIconComp}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default SelectIcon;