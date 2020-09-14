import React from 'react';
import styled from 'styled-components';
import StdLevel from 'Components/StdLevel';

/* styled-components */
const Component = styled.div`
    display: flex;
    flex-direction: row;
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
    margin: 2.5px;
    display: flex;
    flex-direction: row;
`;

const DiagResult = styled.div`
    display: flex;
    flex-direction: column;
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
    document.body.style.overflow = 'visible';

    return (
        <Component>
            <DiagResult>
                <DiagTitle>청각처리 검사</DiagTitle>
                <DiagTitle>청각처리 검사</DiagTitle>
                <DiagTitle>청각처리 검사</DiagTitle>
            </DiagResult>
        </Component>
    );
}

export default ResultContent;
