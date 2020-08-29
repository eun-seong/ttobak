import React from 'react';
import styled from 'styled-components';

import AnswerBox from 'img/d1_sweep/box.png';

import AnswerDown from 'img/d1_sweep/answer_down.png';
import AnswerUp from 'img/d1_sweep/answer_up.png';

const Div = styled.div`
    display: flex;
    justify-content: center;
`;

const AnswerBoxImg = styled.img`
    width: 100%;
`;

const AnswerComp = styled.div`
    position: absolute;
    height: 30%;
    width: 70%;
    display: flex;
    justify-content: space-around;
    /* background-color: red; */
    top: 15%;
`;

const BoxFram = styled.div`
    display: flex;
    flex-grow:1;
    /* background-color:gray; */
    width: 50%;
    justify-content: center;
`;

const Answer = styled.img`
    width: auto; 
    height: 93%;
`;

const AnswerBoxComp = ({ Answer1, Answer2 }) => {
    return (
        <Div>
            <AnswerComp>
                <BoxFram><Answer src={Answer1} /></BoxFram>
                <BoxFram><Answer src={Answer2} /></BoxFram>
            </AnswerComp>
            <AnswerBoxImg src={AnswerBox} alt='answerbox' />
        </Div>
    );
}

export default AnswerBoxComp;