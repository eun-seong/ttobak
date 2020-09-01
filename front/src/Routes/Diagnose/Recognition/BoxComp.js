import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 50%;
`;

const BoxImg = styled.img`
    position: relative;
    width: 100%;
    top: 16%;
    z-index: 2;
`;

const TreeImg = styled.img`
    position: relative;
    width: 80%;
    z-index: 1;
    margin-left: 10%;
`;

const BoxComp = ({ Box, Tree, Clicked, id }) => {
    return (
        <Component onTouchStart={() => Clicked(id)}>
            <BoxImg src={Box} alt='box' />
            <TreeImg src={Tree} alt='tree2' />
        </Component>
    );
}

export default BoxComp;