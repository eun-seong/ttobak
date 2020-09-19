import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 5px 0px 5px 0px;
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 15px;
`;

const Img = styled.img`
    width: 20vw;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Explain = styled.div`
    font-size: 1rem;
`;

function ContentComp({ src, title, explain }) {
    return (
        <Container>
            <Img src={src} alt='이미지' />
            <Text>
                <Title>{title || '어음청취력'}</Title>
                <Explain>{explain || '소리를 듣고 구분해요!'}</Explain>
            </Text>
        </Container>
    );
}

export default ContentComp;