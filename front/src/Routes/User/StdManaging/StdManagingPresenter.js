import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderComp from 'Components/HeaderComp';
import StdManagingComp from './StdManagingComp';

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

const StdManaging = ({ student, handleSubmit, iconNum, goBack }) => {

    return (
        <Container>
            <HeaderComp title={'학습자 수정'} goBack={goBack} />
            <Div><StdManagingComp iconNum={iconNum} student={student} handleSubmit={handleSubmit} /></Div>
        </Container >
    );
}

export default StdManaging;