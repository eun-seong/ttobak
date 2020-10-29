import React from 'react';
import styled from 'styled-components';
import { MainRoot } from 'images';
import RootBackGround from 'Components/RootBackGround';
import StdChangeComp from './StdChangeComp';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const Div = styled.div`
		width: 100%;
		height: calc(100% - 90px);
		padding: 3%;
		display: flex;
		justify-content: center;
		align-items: center;
`

const StdChange = ({ students, handleSubmit, goBack }) => {
    return (
        <RootBackGround
            background={MainRoot.icon_background}
            title={'학습자 선택'}
            Content={() => StdChangeComp({students, handleSubmit})}
            goBack={goBack}>
        </RootBackGround>
    );
}

export default StdChange;