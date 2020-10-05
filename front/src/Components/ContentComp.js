import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    height: 100%;
    flex-direction: row;
    padding: 5px 0;
`;

const Text = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 15px;
`;

const Img = styled.img`
    display: flex;
    height: 100%;
    width: auto;
`;

const Title = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Explain = styled.div`
    font-size: 1rem;
`;

function ContentComp({ src, title, explain, flex }) {
    return (
        <Container>
            <Img src={src} alt='이미지' />
            <Text flex={flex}>
                <Title>{title || '어음청취력'}</Title>
                <Explain>{explain || '소리를 듣고 구분해요!'}</Explain>
            </Text>
        </Container>
    );
}

export default ContentComp;