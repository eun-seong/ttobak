import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button_Pause from 'img/bt_pause.png';
import Background from 'img/t2_counting/t2_background.png'
import Tree from 'img/t2_counting/tree.png'
import Basket from 'img/t2_counting/basket.png';
import TTobak from 'img/ttobak/ttobak1-1.png';

/* styled-components */
const Img = styled.img`
    width: 100%;
`;

const BackgroundImg = styled(Img)`
    margin: auto auto;
    bottom:0;
`;

const PauseButton = styled(Img)`
    position : absolute;
    width:7%;
    margin: 10px;
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
    width: 45%;
    top: 52%;
    right: 12%;
`;

const TTobakComponent = styled.img`
    position:absolute;
    width: 18%;
    top: 4%;
    right: 20%;
`;

const Counting = ({ onTreeClick, onTreeDragStart, onTreeDragEnd }) => {
    return (
        <div>
            <TTobakComponent src={TTobak} alt='또박이' onClick={() => alert('hi')} />
            <TreeImg
                src={Tree}
                alt='나무'
                onTouchStart={onTreeClick}
                onDragStart={onTreeDragStart}
                onDragEnd={onTreeDragEnd} />
            <BasketImg src={Basket} alt='바구니' />
            <Link to=''><PauseButton src={Button_Pause} alt='일시정지' /></Link>
            <BackgroundImg src={Background} alt='배경화면' />
        </div>
    );
}

export default Counting;