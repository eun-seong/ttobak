import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderComp from 'Components/HeaderComp';
import ExplainBoxComp from 'Components/ExplainBoxComp';
import Button from 'Components/Button';

import ResultContent from './ResultContent';
import UserContent from './UserContent';

/* styled-components */
const ScrollBox = styled.div`
    padding: 0px 30px 25px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserInfo = styled.div`
    
`;

const Result = () => {
    document.body.style.overflow = 'visible';

    return (
        <div>
            <HeaderComp title={'또박이 검사 결과'} />
            <ScrollBox>
                <div>
                    <ExplainBoxComp Content={<UserContent />} margin={'25px'} />
                </div>
                <ExplainBoxComp Content={<ResultContent />} margin={'25px'} />
                <ExplainBoxComp Content={<ResultContent />} margin={'25px'} />
                <ExplainBoxComp Content={<ResultContent />} margin={'25px'} />
                <Link to='/main/main'><Button text={'확인'} /></Link>
            </ScrollBox>
        </div>
    );
}

export default Result;