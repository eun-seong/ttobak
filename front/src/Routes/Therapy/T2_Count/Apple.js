import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd'
import { usePreview } from 'react-dnd-preview';

import { ItemTypes } from 'const';

const TreeDiv = styled.div`
    position: absolute;
    width: 50vw;
    height: 30vw;
    left: 0;
`;

const AppleImg = styled.img`
    position: absolute;
    height: 21vh;
    width: auto;
    max-height: 80px;
    z-index: 2;
`;

let apple = null;

const ApplePreview = ({ touchPosition }) => {
    const { display, style } = usePreview();
    if (!display) {
        return null;
    }

    const trans = style.WebkitTransform.split('(')[1].split(')')[0].split(', ');
    const [transX, transY] = [
        parseFloat(trans[0].split('px')[0]) + touchPosition[0] - 0.105 * document.documentElement.clientHeight,
        parseFloat(trans[1].split('px')[0]) + touchPosition[1] - 0.105 * document.documentElement.clientHeight
    ];
    style.WebkitTransform = `translate(${transX}px, ${transY}px)`;

    return <AppleImg src={apple} alt='apple' style={style} />;
}

const Apple = ({ isTreeDragging, touchPosition, onTreeTouchStartHandle, onTreeTouchEndHandle, createRandomApple }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.APPLE },
        begin: () => {
            apple = createRandomApple();
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    });

    return (
        <div>
            <ApplePreview touchPosition={touchPosition} isTreeDragging={isTreeDragging} />
            <TreeDiv
                ref={drag}
                isTreeDragging={isTreeDragging}
                onTouchStart={onTreeTouchStartHandle}
                onTouchEnd={onTreeTouchEndHandle}
            ></TreeDiv>
        </div>
    );
}

export default Apple;