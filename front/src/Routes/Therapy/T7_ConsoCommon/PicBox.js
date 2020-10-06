import React from 'react';
import styled from 'styled-components';

import { T7 } from 'images';

const PicBoxComponent = styled.div`
    display: flex;
    justify-content: center;
`;

const Picture = styled.img`
    position: absolute;
    width: 35%;
    top: 10%;
`;

const FrameBox = styled.img`
    width: 43%;
`;

const PicBox = ({ src }) => {
    return (
        <PicBoxComponent>
            <Picture src={T7.t7_excpic} alt='그림' />
            <FrameBox src={T7.t7_frame} alt='정답박스' />
        </PicBoxComponent>
    );
}

export default PicBox;