import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ProfileIcon from 'Components/ProfileIcon';
import BackButton from 'Components/BackButton';

const StdComp = styled.div`
    display: flex;
    width: 100%;
    height: 37px;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 15px;
`;

const Bar = styled.div`
    display: flex;
    height: 100%;
    background-color: #ffffff;
    border-radius: 40px;
    align-items: center;
    padding: 2px;
    flex:1;
`;

const StdChange = styled(Link)`
    height: 37px;
    background-color: #ffffff;
    border-radius: 40px;
    margin-left: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    padding: 0px 15px;
`;

const Name = styled.div`
    display: flex;
    font-size: 1.4rem;
    margin-left: 10px;
    align-items: center;
    text-align: center;
`;

const StdBox = ({ student, goBack }) => {
    console.log('stdinfo - stdbox');
    return (
        <StdComp>
            <BackButton goBack={goBack} size={'43px'} />
            <Bar>
                <ProfileIcon size={'33px'} iconNum={student.ic_id} />
                <Name>{student.name}</Name>
            </Bar>
            <StdChange to='/user/stdchange'>학습자 변경</StdChange>
        </StdComp >
    );
}

export default StdBox;