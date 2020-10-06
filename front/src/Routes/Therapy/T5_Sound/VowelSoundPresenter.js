import React from 'react';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';

import CardComp from './Card';

/* styled-components */
const Component = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`;

const Img = styled.img`
    width: 100%;
`;

const BackgroundImg = styled(Img)`
    margin: auto auto;
    bottom:0;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 20%;
    top: 17%;
    left: 3%;
`;

const CardParent = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: row;
    right: 6%;
    bottom: 4%;
    width: 60vw;
    height: 96vh;
`;

const VowelSound = (props) => {
    console.log(props);
    return (
        <Component>
            <PauseButton link={'/'} />
            <TTobakComponent src={props.TTobak} alt='또박이' onTouchEnd={props.TTobakiTouch} />
            <CardParent>
                <CardComp src={props.Card[0]} alt='카드1' />
                <CardComp src={props.Card[1]} alt='카드2' />
            </CardParent>
            <BackgroundImg src={props.Background} alt='배경화면' />
        </Component>
    );
}

export default VowelSound;