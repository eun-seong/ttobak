import React from 'react';
import styled from 'styled-components';

import ContentComp from 'Components/ContentComp';

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const Div = styled.div`
    height: 65%;
`;

function CustomLearning({ daily_custom, daily_complete }) {
    if (daily_complete)
        return (
            <div>오늘 학습을 완료했습니다.</div>
        );
    if (!!daily_custom)
        return (
            <Container>
                <Div>
                    <ContentComp content={daily_custom} />
                </Div>
            </Container>
        );
    else return <div>loading...</div>
}

export default CustomLearning;