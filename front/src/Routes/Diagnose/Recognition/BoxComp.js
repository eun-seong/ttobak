import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const Component = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
`;

const BoxImg = styled.img`
    ${props => {
        if (props.isAnimate) {
            return css`
                position: relative;
                width: 100%;
                top: 16%;
                z-index: 2;
                animation: ${animate} 0.5s 0.3s 2 alternate;
                animation-timing-function:ease;
            `;
        } else {
            return css`
                position: relative;
                width: 100%;
                top: 16%;
                z-index: 2;
            `;
        }
    }}
`;

const TreeImg = styled.img`
    position: relative;
    width: 80%;
    z-index: 1;
    margin-left: 10%;
`;

const animate = keyframes`
    from{
        bottom:0px;
    }
    to{
        top:10px;
    }
`;

const BoxComp = ({ Box, Tree, Clicked, id, isAnimate }) => {
    return (
        <Component >
            <BoxImg src={Box} alt='box' onTouchEnd={() => Clicked(id)} isAnimate={isAnimate} />
            <TreeImg src={Tree} alt='tree2' />
        </Component>
    );
}

export default BoxComp;