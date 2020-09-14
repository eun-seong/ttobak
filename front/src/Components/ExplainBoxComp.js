import React from 'react';
import styled from 'styled-components';

const ExplainBox = styled.div`
    width: 100%;
    border-radius: 15px;
    background-color: #FFFFFF;
    border: 2px solid #DFD7C4;
    margin: 0px 0px 25px 0px;
    padding: 20px;
`;

function ExplainBoxcomp({ Content }) {
    return (
        <ExplainBox>
            <Content />
        </ExplainBox>
    );
}

export default ExplainBoxcomp;