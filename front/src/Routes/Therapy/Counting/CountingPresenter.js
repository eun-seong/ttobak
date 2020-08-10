import React from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { LOCATION, QDATA } from './data';
import Dropzone from './Dropzone';

import Button_Pause from 'img/bt_pause.svg';
import Background from 'img/therapy2/d2_background.png'
import Tree from 'img/therapy2/tree.png'
import Basket from 'img/therapy2/basket.png';

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
    width : 60%;
    position: absolute;
    opacity: 0.0;
    top:0;
    left:0;
`;

const BasketImg = styled(Img)`
    width: 45%;
    position : absolute;
    top: 52%;
    right:12%;
`;

const Counting = ({ onClick, onDragEnd }) => {
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <TreeImg
                    src={Tree}
                    alt='나무'
                    onClick={onClick} />
                <Link to=''><PauseButton src={Button_Pause} alt='일시정지' /></Link>
                <BasketImg
                    src={Basket}
                    alt='바구니' />
                <BackgroundImg src={Background} alt='배경화면' />
            </DragDropContext>
        </div>
    );
}

export default Counting;