import React from 'react';
import styled, { css } from 'styled-components';
import { useDrag, DragPreviewImage } from 'react-dnd'
import { usePreview } from 'react-dnd-preview';

import { ItemTypes } from 'const';
import { T2 } from 'images';

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

const ApplePreview = ({ touchPosition, clientHeight }) => {
    const { display, itemType, item, style } = usePreview();
    console.log('#######display ' + display);
    if (!display) {
        return null;
    }

    const trans = style.WebkitTransform.split('(')[1].split(')')[0].split(', ');
    const [transX, transY] = [
        parseFloat(trans[0].split('px')[0]) + touchPosition[0] - 0.105 * clientHeight,
        parseFloat(trans[1].split('px')[0]) + touchPosition[1] - 0.105 * clientHeight
    ];
    style.transform = `translate(${transX}px, ${transY}px)`;
    style.WebkitTransform = `translate(${transX}px, ${transY}px)`;

    return <AppleImg src={T2.t2_Apples[1]} alt='apple' style={style} />;
}

const Apple = ({ isTreeDragging, touchPosition, clientHeight, onTreeTouchStartHandle, onTreeTouchEndHandle }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.APPLE },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    });

    console.log('#######isDragging ' + isDragging);
    return (
        <>
            <ApplePreview touchPosition={touchPosition} isTreeDragging={isTreeDragging} clientHeight={clientHeight} />
            <TreeDiv
                ref={drag}
                isTreeDragging={isTreeDragging}
                onTouchStart={onTreeTouchStartHandle}
                onTouchEnd={onTreeTouchEndHandle}
            ></TreeDiv>
        </>
    );
}

export default Apple;