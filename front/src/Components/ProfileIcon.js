import React from 'react';
import styled from 'styled-components';

import { MainRoot } from 'images';

const Div = styled.div`
    border-radius: 100%;
    background-color: rgba(0,0,0,0);
    border: 0px solid;
    width: ${props => props.size || '100px'};
    height: ${props => props.size || '100px'};
`;

const Icon = styled.img`
    width: 100%;
    height: 100%;
`;

function ProfileIcon({ iconNum, size }) {
    return (
        <Div size={size} >
            <Icon src={MainRoot.IconList[iconNum]} />
        </Div>
    );
}

export default ProfileIcon;