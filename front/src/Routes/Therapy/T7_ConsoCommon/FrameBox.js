import React from 'react';
import styled from 'styled-components';

import { T7 } from 'images';

const Box = styled.div`
    display: flex;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
    width: 100%;
    height: 100%;
    justify-content:center;
    align-items: center;
`;

const Picture = styled.img`
    width: auto;
    height: 78%;
`;

const FrameBox = ({ src }) => {
    return (
        <Box src={T7.t7_frame} >
            <Picture src={src} alt='그림' />
        </Box>
    );
}

export default FrameBox;