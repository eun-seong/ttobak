import React from 'react';
import styled from 'styled-components';

const AnswerBoxImg = styled.div`
    display: flex;
    justify-content: center;
    height: 65%;
    width: 100%;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
`;

const AnswerComp = styled.div`
    width: 54vh;
    height: 24vh;
    display: flex;
    justify-content: space-between;
    margin-top: 16vh;
`;

const Answer = styled.img`
    height:100%;
`;

const AnswerBoxComp = ({ Answer1, Answer2, AnswerBox }) => {
    return (
        <AnswerBoxImg src={AnswerBox} >
            <AnswerComp>
                <Answer src={Answer1} />
                <Answer src={Answer2} />
            </AnswerComp>
        </AnswerBoxImg>
    );
}

// const AnswerBoxComp = ({ Answer1, Answer2 }) => {
//     return (
//         <Div>
//             <AnswerComp paddingSide={'2.3%'}>
//                 <Answer src={Answer1} />
//                 <Answer src={Answer2} />
//             </AnswerComp>
//             <AnswerBoxImg src={AnswerBox} alt='answerbox' />
//         </Div>
//     );
// }

export default AnswerBoxComp;