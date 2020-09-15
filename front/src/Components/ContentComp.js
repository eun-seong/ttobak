import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
    width: 20vw;
`;

const Title = styled.div`

`;

const Explain = styled.div`

`;

function ContentComp({ src, title, explain }) {
    return (
        <div>
            <Img src={src} alt='이미지' />
            <Title>{title || ''}</Title>
            <Explain>{explain || ''}</Explain>
        </div>
    );
}

export default ContentComp;