import React from 'react';
import styled from 'styled-components';

import AnswerBox from 'img/d1_sweep/box.png';
// import { SwpTest } from 'images';

const Div = styled.div`
    display: flex;
    justify-content: center;
`;

const AnswerBoxImg = styled.img`
    width: 100%;
    height: 100%;
`;

const AnswerComp = styled.div`
    position: absolute;
    width: 65%;
    height: 28%;
    display: flex;
    justify-content: space-between;
    /* background-color: red; */
    top: 15%;
    padding: 0 ${props => props.paddingSide} 0 ${props => props.paddingSide};
`;

const BoxFram = styled.div`
    /* display: flex;
    flex-grow:1;
    justify-content: ${props => props.flex}; */
    /* background-color:gray; */
`;

const Answer = styled.img`
    height:100%;
    /* flex-grow:1; */
`;

const AnswerBoxComp = ({ Answer1, Answer2 }) => {
    return (
        <Div>
            <AnswerComp paddingSide={'2.3%'}>
                <Answer src={Answer1} />
                <Answer src={Answer2} />
            </AnswerComp>
            <AnswerBoxImg src={AnswerBox} alt='answerbox' />
        </Div>
    );
}

export default AnswerBoxComp;