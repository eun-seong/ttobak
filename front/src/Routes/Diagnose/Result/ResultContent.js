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

const ResultContent = ({ student }) => {
    document.body.style.overflow = "visible"

    return (
        <Component>
            <DiagHeader>
                <DiagSummary>
                    <DiagTitle>어음청취력 검사</DiagTitle>
                    <StdLevel text={level.level2.text} />
                </DiagSummary>
                <DiagExplain>
                    간략한 설명 간략한 설명 간략한 설명 간략한 설명 간략한 설명 간략한 설명
                    간략한 설명 간략한 설명 간략한 설명 간략한 설명 간략한 설명 간략한 설명
                    간략한 설명 간략한 설명 간략한 설명 간략한 설명 간략한 설명 간략한 설명
                </DiagExplain>
            </DiagHeader>
            <ResultExplain>
                검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명
                검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명
                검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명
                검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명
                검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명 검사 결과 설명
            </ResultExplain>
        </Component>
    );
}

export default ResultContent;
