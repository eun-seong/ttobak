import React from 'react';
import styled, { css } from 'styled-components';
import { useDrag, DragPreviewImage } from 'react-dnd'
import { usePreview } from 'react-dnd-preview';

import { ItemTypes } from 'const';
import { T2 } from 'images';
import { render } from '@testing-library/react';

const AppleImg = styled.img`
    position: absolute;
    height: 21vh;
    width: auto;
    max-height: 80px;
    opacity: ${props => props.isDragging ? 0.5 : 1};
    ${props => {
        if (!props.isTreeDragging) {
            return css`
                display: none;
            `;
        } else {
            const { touchPosition, clientHeight } = props;
            const [posX, posY] = [touchPosition[0] - 0.105 * clientHeight, touchPosition[1] - 0.105 * clientHeight];
            return css`
                left:${posX + 'px'};
                top: ${posY + 'px'};
            `;
        }
    }};
`;

const ApplePreview = () => {
    const { display, itemType, item, style } = usePreview();
    console.log('#######display ' + display);
    if (!display) {
        return null;
    }
    return <AppleImg src={T2.t2_Apples[1]} alt='apple' style={style} />;
}

const Apple = ({ isTreeDragging, touchPosition, clientHeight }) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.APPLE },
        isDragging(monitor) { return isTreeDragging; },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        }),
    });

    console.log('#######isDragging ' + isDragging);
    return (
        <>
            <ApplePreview isTreeDragging={isTreeDragging} />
            <AppleImg
                src={T2.t2_Apples[0]} alt='apple'
                ref={drag}
                isDragging={isTreeDragging}
                isTreeDragging={isTreeDragging}
                touchPosition={touchPosition}
                clientHeight={clientHeight}
            />
        </>
    );
}

export default Apple;


