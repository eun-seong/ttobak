import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ProfileIcon from 'Components/ProfileIcon';

const StdComp = styled.div`
    display: flex;
    width: 100%;
    height: 37px;
    justify-content: space-between;
    flex-direction: row;
    margin-bottom: 15px;
`;

const Bar = styled(Link)`
    display: flex;
    height: 100%;
    background-color: #ffffff;
    border: 1.5px solid #DFD7C4;
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
    border: 1.5px solid #DFD7C4;
    margin-left: 15px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
`;

const Name = styled.div`
    display: flex;
    font-size: 1.4rem;
    margin-left: 10px;
    align-items: center;
    text-align: center;
`;

const StdBox = () => {
    return (
        <StdComp>
            <Bar to={'/user/stdinfo'}>
                <ProfileIcon size={'33px'} iconNum={1} />
                <Name>이지호</Name>
            </Bar>
            <Setting to='/user/setting'>설정</Setting>
        </StdComp >
    );
}

export default StdBox;