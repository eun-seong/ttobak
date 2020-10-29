import React from 'react';
import styled from 'styled-components';

import BoxComp from './BoxComp';
import { D2 } from 'images';

const Component = styled.div`
    position: absolute;
    display: flex;
    bottom: 3%;
    justify-content:space-around;
    margin: 0 10%;
`;

const AnswerComp = ({ Box, Clicked, isAnimate }) => {
    return (
        <Component>
            <BoxComp Tree={D2.d2_Tree1} Box={Box[0]} Clicked={Clicked} id={0} isAnimate={isAnimate[0]} />
            <BoxComp Tree={D2.d2_Tree2} Box={Box[1]} Clicked={Clicked} id={1} isAnimate={isAnimate[1]} />
        </Component>
    );
}

export default AnswerComp;