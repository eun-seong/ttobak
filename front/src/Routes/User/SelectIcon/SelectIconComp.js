import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileIcon from 'Components/ProfileIcon';

const Icons = styled.div`
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

function SelectIconComp() {
    return (
        <Icons>
            <Link to={'/root/addstd/1'}><ProfileIcon iconNum={1} size={'120px'} /></Link>
            <Link to={'/root/addstd/2'}><ProfileIcon iconNum={2} size={'120px'} /></Link>
            <Link to={'/root/addstd/3'}><ProfileIcon iconNum={3} size={'120px'} /></Link>
        </Icons>
    );
}

export default SelectIconComp;