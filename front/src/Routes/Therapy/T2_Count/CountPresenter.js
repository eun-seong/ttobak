import React from 'react';
import styled from 'styled-components';

import PauseButton from 'Components/PauseButton';

/* styled-components */
const Img = styled.img`
    width: 100%;
`;

const BackgroundImg = styled(Img)`
    margin: auto auto;
    bottom:0;
`;

const TreeImg = styled(Img)`
    position: absolute;
    width : 60%;
    opacity: 0.0;
    top:0;
    left:0;
`;

const BasketImg = styled(Img)`
    position: absolute;
    width: 47%;
    top: 52%;
    right: 10%;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 18%;
    top: 4%;
    right: 20%;
`;

const Counting = ({ onTreeClick, onTreeDragStart, onTreeDragEnd, Background, TTobak, Basket }) => {
    return (
        <div>
            <TTobakComponent src={TTobak} alt='또박이' onClick={() => alert('hi')} />
            {/* <TreeImg
                src={Tree}
                alt='나무'
                onTouchStart={onTreeClick}
                onDragStart={onTreeDragStart}
                onDragEnd={onTreeDragEnd} /> */}
            <BasketImg src={Basket} alt='바구니' />
            <PauseButton link={'/'} />
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Counting;