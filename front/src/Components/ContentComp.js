import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled(Link)`
    display: flex;
    height: 100%;
    flex-direction: row;
    padding: 5px 0;
`;

const Div = styled.div`
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

function ContentComp({ flex, url, content }) {
    var ContentContainer = Container;
    if (!url) ContentContainer = Div;

    return (
        <ContentContainer to={url}>
            <Img src={content.img} alt={content.name} />
            <Text flex={flex}>
                <Title>{content.title || '어음청취력'}</Title>
                <Explain>{content.explain || '소리를 듣고 구분해요!'}</Explain>
            </Text>
        </ContentContainer>
    );
}

export default ContentComp;