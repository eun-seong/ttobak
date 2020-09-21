import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeaderComp from 'Components/HeaderComp';

/* styled-components */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const StdStatistics = ({ goBack }) => {

    return (
        <Container>
            <HeaderComp title={'학습자 통계'} goBack={goBack} />
            Student Statistics
        </Container >
    );
}

export default StdStatistics;