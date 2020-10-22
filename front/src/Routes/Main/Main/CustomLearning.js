import React from 'react';
import styled from 'styled-components';

import ContentComp from 'Components/ContentComp';
import ContentList from '../ContentsList';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const Div = styled.div`
    height: 65%;
`;

function CustomLearning({ daily_custom }) {
    const content = ContentList.filter(c => {
        return c.name === daily_custom;
    })[0];

    if (!!content)
        return (
            <Container>
                <Div>
                    <ContentComp content={content} />
                </Div>
            </Container>
        );
    else return <div>loading...</div>
}

export default CustomLearning;