import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ProfileIcon from 'Components/ProfileIcon';

const StdComp = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 15px;
`;

const Bar = styled(Link)`
    display: flex;
    height: 37px;
    background-color: #ffffff;
    border-radius: 40px;
    align-items: center;
    padding: 2px;
    flex: 1;
`;

const Setting = styled(Link)`
    height: 37px;
    width: 37px;
    background-color: #ffffff;
    border-radius: 40px;
    margin-left: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
`;

const StdChange = styled(Link)`
    height: 37px;
    width: 120px;
    background-color: #ffffff;
    border-radius: 40px;
    margin-left: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
`;

const Name = styled.div`
    display: flex;
    font-size: 1.4rem;
    margin-left: 10px;
    align-items: center;
    text-align: center;
`;

const StdBox = ({ linkto, main, goBack }) => {
    return (
        <StdComp>
            <Bar to={linkto} goBack={goBack}>
                <ProfileIcon size={'33px'} iconNum={1} />
                <Name>이지호</Name>
            </Bar>
            { main && <Setting to='/user/setting'>설정</Setting>}
            { !main && <StdChange to='/user/stdsetting'>학습자 변경</StdChange>}
        </StdComp >
    );
}

export default StdBox;