import React from 'react';
import styled from 'styled-components';

import ContentComp from 'Components/ContentComp';
import { MainTherapy } from 'images';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const Div = styled.div`
    height: 65%;
`;

function CustomLearning() {
    return (
        <Container>
            <Div>
                <ContentComp src={MainTherapy[0]} />
            </Div>
        </Container>
    );
}

export default CustomLearning;