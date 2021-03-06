import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileIcon from 'Components/ProfileIcon';

import { MainRoot } from 'images';

const Icons = styled.div`
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: column;
`;

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;  
`;

const Div = styled.div`
    border-radius: 100%;
    border: 0px solid;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Plus = styled.img`
    width: 90%;
    height: 90%;
`;

function SelectStudentComp({students, handler}) {
    const icons = students.map(el => {
        return (<Link to={''} key={el['s_id']} onClick={(e) => {handler(e, el['s_id']);}}><Icon><ProfileIcon iconNum={el['ic_id']} size={'120px'} /><Text>{el['name']}</Text></Icon></Link>);
    });
    return (
        <Icons>
            {icons}
            <Link to={'/root/addstd/1'} key='0'><Icon><Div><Plus src={MainRoot.IconList[0]}></Plus></Div><Text>추가</Text></Icon></Link>
        </Icons>
    );
}

export default SelectStudentComp;