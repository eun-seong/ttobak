import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComp from 'Components/HeaderComp';
import ExplainBoxcomp from 'Components/ExplainBoxComp';
import Button from 'Components/Button';

import ResultContent from './ResultContent';

/* styled-components */
const ScrollBox = styled.div`
    padding: 0px 30px 25px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Result = () => {
    document.body.style.overflow = "visible"

    return (
        <div>
            <HeaderComp title={'또박이 검사 결과'} />
            <ScrollBox>
                <ExplainBoxcomp Content={ResultContent} />
                <ExplainBoxcomp Content={ResultContent} />
                <ExplainBoxcomp Content={ResultContent} />
                <Button text={'확인'} />
            </ScrollBox>
        </div>
    );
}

export default Result;