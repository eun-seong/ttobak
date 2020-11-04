import React from 'react';
import styled from 'styled-components';
import StdLevel from 'Components/StdLevel';

import level from 'const';

/* styled-components */
const Component = styled.div`
    display: flex;
    flex-direction: column;
`;

const DiagHeader = styled.div`
    margin: 0px 0px 20px 0px;
    display: flex;
    flex-direction: row;
`;

const DiagSummary = styled.div`
    padding: 1% 0% 3% 0%;
`;

const DiagTitle = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 5px;
`;

const DiagExplain = styled.div`
    flex: 1;
    margin: 0px 0px 0px 3%;
    padding: 13px;
    border-radius: 10px;
    font-size: 0.75rem;
    background-color: #DFD7C4;
`;

const ResultExplain = styled.div`
    font-size: 0.9rem;
`;

const ResultContent = ({ student, result, diagnose }) => {
    document.body.style.overflow = "visible"

    return (
        <Component>
            <DiagHeader>
                <DiagSummary>
                    <DiagTitle>{diagnose.title}</DiagTitle>
                    {/* <StdLevel text={level.level2.text} /> */}
                </DiagSummary>
                <DiagExplain>
                    {diagnose.explain}
                </DiagExplain>
            </DiagHeader>
            <ResultExplain>
                {
                    (diagnose.title === '선택적집중력') ?
                        <div>총 문제 수는 {result['총 문제 개수']}개로, 평균 발음 정확도는 {result['평균 발음 정확도']}% 입니다.</div> :
                        <div>총 문제 수는 {result['총 문제 개수']}개로, 맞춘 문제의 수는 {result['맞은 개수']}개입니다.</div>
                }
            </ResultExplain>
        </Component>
    );
}

export default ResultContent;
