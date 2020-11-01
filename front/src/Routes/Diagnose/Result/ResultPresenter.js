import React from 'react';
import styled from 'styled-components';
import HeaderComp from 'Components/HeaderComp';
import ExplainBoxComp from 'Components/ExplainBoxComp';
import Button from 'Components/Button';

import ResultContent from './ResultContent';
import UserContent from './UserContent';

import { Diagnose_explain } from 'const';

/* styled-components */
const ScrollBox = styled.div`
    padding: 0px 30px 25px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Result = ({ result, name, birth }) => {
    document.body.style.overflow = 'visible';

    return (
        <div>
            <HeaderComp title={'또박이 검사 결과'} />
            <ScrollBox>
                <div>
                    <ExplainBoxComp Content={<UserContent result={result} name={name} birth={birth} />} margin={'25px'} />
                </div>
                <ExplainBoxComp Content={<ResultContent diagnose={Diagnose_explain.swp} result={result[Diagnose_explain.swp.title]} />} margin={'25px'} />
                <ExplainBoxComp Content={<ResultContent diagnose={Diagnose_explain.recognition} result={result[Diagnose_explain.recognition.title]} />} margin={'25px'} />
                <ExplainBoxComp Content={<ResultContent diagnose={Diagnose_explain.attention} result={result[Diagnose_explain.attention.title]} />} margin={'25px'} />
                <Button text={'확인'} to={'/main/main'} />
            </ScrollBox>
        </div>
    );
}

export default Result;