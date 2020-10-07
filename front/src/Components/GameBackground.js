import React from 'react';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';

const BackgroundDiv = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
`;

const GameBackground = ({ BackgroundImg, Children }) => {
    return (
        <BackgroundDiv src={BackgroundImg}>
            {Children}
            <PauseButton link={'/'} />
        </BackgroundDiv>
    );
}

export default GameBackground;