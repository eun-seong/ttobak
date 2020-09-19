import React from 'react';
import styled from 'styled-components';

import ContentComp from 'Components/ContentComp';
import { MainTherapy } from 'images';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;

function CustomLearning() {
    return (
        <Container>
            <ContentComp src={MainTherapy[0]} />
        </Container>
    );
}

export default CustomLearning;