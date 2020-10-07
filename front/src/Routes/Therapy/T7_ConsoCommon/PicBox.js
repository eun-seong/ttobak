import React from 'react';
import styled from 'styled-components';

import { T7 } from 'images';

const Picture = styled.img`
    width: 78%;
`;

const FrameBox = styled.div`
    display: flex;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    justify-content:center;
    align-items: center;
`;

const PicBox = ({ src }) => {
    return (
        <FrameBox src={T7.t7_frame}>
            <Picture src={src || T7.t7_excpic} alt='그림' />
        </FrameBox>
    );
}

export default PicBox;